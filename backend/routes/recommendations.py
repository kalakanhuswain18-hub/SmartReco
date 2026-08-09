from flask import Blueprint, request, jsonify
from models import db, Event, Product, Recommendation
from collections import Counter
from services.chroma_service import search_products
from services.mesh_service import ask_mesh
import json

recommendation_bp = Blueprint(
    "recommendation",
    __name__
)


@recommendation_bp.route(
    "/recommend/<int:user_id>",
    methods=["GET"]
)
def recommend(user_id):

    events = Event.query.filter_by(
        user_id=user_id
    ).all()

    if not events:

        return jsonify({
            "message": "No user activity found"
        }), 404


    searches = []

    for event in events:

        if event.search_query:
            searches.append(
                event.search_query
            )

    return jsonify({

        "user_id": user_id,

        "total_events": len(events),

        "recent_searches": searches

    })
@recommendation_bp.route("/recommend/similar", methods=["GET"])
def similar_products():

    query = request.args.get("q", "").strip()

    if not query:
        return jsonify({
            "message": "Query is required"
        }), 400

    results = search_products(query)

    ids = results.get("ids", [])

    if not ids or not ids[0]:
        return jsonify([])

    recommendations = []

    distances = results.get("distances", [[]])[0]

    for index, product_id in enumerate(ids[0]):

        product = Product.query.get(int(product_id))

        if product:

            recommendations.append({

                "id": product.id,
                "name": product.name,
                "description": product.description,
                "category": product.category,
                "price": product.price,
                "image": product.image,

                "similarity_score": round(
                    1 - distances[index],
                    4
                )

            })

    return jsonify(recommendations)
@recommendation_bp.route("/recommend/user/<int:user_id>", methods=["GET"])
def recommend_for_user(user_id):

    events = Event.query.filter_by(user_id=user_id).all()

    if not events:
        return jsonify({
            "message": "No user activity found"
        }), 404

    categories = []

    for event in events:

        if event.product_id:

            product = Product.query.get(event.product_id)

            if product:
                categories.append(product.category)

    if not categories:
        return jsonify({
            "message": "No product history found"
        }), 404

    favorite_category = Counter(categories).most_common(1)[0][0]

    recommendations = Product.query.filter_by(
        category=favorite_category
    ).limit(5).all()

    result = []

    for product in recommendations:

        result.append({

            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "image": product.image

        })

    return jsonify({

        "favorite_category": favorite_category,
        "recommendations": result

    })
@recommendation_bp.route("/user/recent/<int:user_id>", methods=["GET"])
def recently_viewed(user_id):

    events = (
        Event.query
        .filter_by(user_id=user_id, event_type="view")
        .order_by(Event.id.desc())
        .limit(10)
        .all()
    )

    result = []
    seen = set()

    for event in events:

        product = Product.query.get(event.product_id)

        if product and product.id not in seen:

            seen.add(product.id)

            result.append({
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "category": product.category,
                "price": product.price,
                "image": product.image
            })

    return jsonify(result)
@recommendation_bp.route(
    "/recommend/agent/<int:user_id>",
    methods=["GET"]
)
def agent_recommendation(user_id):

    events = (
        Event.query
        .filter_by(user_id=user_id)
        .order_by(Event.id.desc())
        .limit(30)
        .all()
    )

    if not events:
        return jsonify({
            "message": "No user activity found"
        }), 404

    behavior = []

    for event in events:

        if event.search_query:
            behavior.append(
                f"User searched for: {event.search_query}"
            )

        if event.product_id:
            product = Product.query.get(event.product_id)

            if product:
                behavior.append(
                    f"User {event.event_type}: "
                    f"{product.name} "
                    f"(category: {product.category})"
                )

    user_context = "\n".join(behavior)

   
    interest_prompt = f"""
    SmartReco user behavior:

    {user_context}

    Give the user's main product interest.
    Return ONLY 2 to 5 simple words.
    Examples:
    beauty products
    electronics
    furniture
    fragrance
    groceries
    """

    retrieval_query = ask_mesh(interest_prompt).strip()


    if not retrieval_query:

        detected_categories = []

        for event in events:
            if event.product_id:
                product = Product.query.get(event.product_id)

                if product and product.category:
                    detected_categories.append(product.category)

        if detected_categories:
            retrieval_query = Counter(
            detected_categories
            ).most_common(1)[0][0]

        elif any(event.search_query for event in events):
            retrieval_query = next(
            event.search_query
                for event in events
                if event.search_query
         )

        else:
          retrieval_query = "popular products"

    results = search_products(
        retrieval_query,
        n_results=5
    )

    ids = results.get("ids", [])

    if not ids or not ids[0]:
        return jsonify({
            "message": "No relevant products found"
        }), 404

    recommended_products = []

    for product_id in ids[0]:

        product = Product.query.get(int(product_id))

        if product:
            recommended_products.append({
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "category": product.category,
                "price": product.price,
                "image": product.image
            })

    if not recommended_products:
        return jsonify({
            "message": "No products found"
        }), 404

  
    product_text = "\n".join(
        [
            f"- {p['name']} | "
            f"Category: {p['category']} | "
            f"Price: ${p['price']} | "
            f"{p['description']}"
            for p in recommended_products
        ]
    )

    recommendation_prompt = f"""
You are SmartReco, a personalized shopping recommendation AI.

USER'S MAIN INTEREST:
{retrieval_query}

RECENT USER BEHAVIOR:
{user_context}

REAL PRODUCTS FROM OUR CATALOG:
{product_text}

Write a short personalized and persuasive recommendation.

Rules:
- Use ONLY the products listed above.
- Never invent a product.
- Mention 1 or 2 product names.
- Explain why they match the user's interest.
- Sound natural and helpful.
- Maximum 60 words.
- Return plain text only.
"""

    recommendation_text = ask_mesh(
        recommendation_prompt
    ).strip()

    if not recommendation_text:
        recommendation_text = (
            f"Based on your interest in {retrieval_query}, "
            "we found some products that may be a great fit for you."
        )

    recommendation = Recommendation(
        user_id=user_id,
        recommendation_text=recommendation_text,
        recommended_products=json.dumps(
            recommended_products
        )
    )

    db.session.add(recommendation)
    db.session.commit()

    return jsonify({
        "user_id": user_id,
        "query": retrieval_query,
        "message": recommendation_text,
        "products": recommended_products,
        "recommendation_id": recommendation.id
    })