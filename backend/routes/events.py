from flask import Blueprint, request, jsonify
from models import db, Event, Product

events_bp = Blueprint("events", __name__)



@events_bp.route("/events", methods=["POST"])
def add_event():

    data = request.get_json()

    user_id = data.get("user_id")
    product_id = data.get("product_id")
    event_type = data.get("event_type")
    search_query = data.get("search_query")

    if not user_id or not event_type:
        return jsonify({
            "success": False,
            "message": "user_id and event_type are required"
        }), 400

    event = Event(
        user_id=user_id,
        product_id=product_id,
        event_type=event_type,
        search_query=search_query
    )

    db.session.add(event)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Event Saved"
    }), 201



@events_bp.route("/events/<int:user_id>", methods=["GET"])
def get_events(user_id):

    events = Event.query.filter_by(user_id=user_id).order_by(
        Event.created_at.desc()
    ).all()

    result = []

    for event in events:

        product_name = None
        category = None

        if event.product_id:
            product = Product.query.get(event.product_id)

            if product:
                product_name = product.name
                category = product.category

        result.append({
            "id": event.id,
            "event_type": event.event_type,
            "product_id": event.product_id,
            "product_name": product_name,
            "category": category,
            "search_query": event.search_query,
            "created_at": event.created_at.isoformat()
            if event.created_at else None
        })

    return jsonify(result), 200



@events_bp.route("/insights/<int:user_id>", methods=["GET"])
def get_user_insights(user_id):

    events = Event.query.filter_by(user_id=user_id).all()

    if not events:
        return jsonify({
            "user_id": user_id,
            "total_events": 0,
            "favorite_category": None,
            "interest_score": 0,
            "category_scores": {},
            "message": "No user activity found"
        }), 200

    category_scores = {}

    weights = {
        "view": 1,
        "viewed": 1,
        "search": 2,
        "searched": 2,
        "wishlist": 3,
        "wishlisted": 3
    }

    for event in events:

        event_type = (event.event_type or "").lower()

        weight = weights.get(event_type, 1)

       
        if event.product_id:

            product = Product.query.get(event.product_id)

            if product and product.category:

                category = product.category

                category_scores[category] = (
                    category_scores.get(category, 0) + weight
                )

        if event.search_query:

            query = event.search_query.strip().lower()

            if query:

                products = Product.query.all()

                for product in products:

                    searchable_text = (
                        f"{product.name} "
                        f"{product.category} "
                        f"{product.description or ''}"
                    ).lower()

                    if query in searchable_text:

                        category = product.category

                        category_scores[category] = (
                            category_scores.get(category, 0)
                            + weight
                        )

   
    if category_scores:

        favorite_category = max(
            category_scores,
            key=category_scores.get
        )

        highest_score = category_scores[favorite_category]

        total_score = sum(category_scores.values())

        interest_score = round(
            (highest_score / total_score) * 100
        )

    else:

        favorite_category = None
        interest_score = 0

    return jsonify({
        "user_id": user_id,
        "total_events": len(events),
        "favorite_category": favorite_category,
        "interest_score": interest_score,
        "category_scores": category_scores
    }), 200