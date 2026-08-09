from flask import Blueprint, request, jsonify
from models import db, Product,Event
from sqlalchemy import or_ ,func
from services.chroma_service import (
    add_product_to_vector,
    collection
)
import requests

products_bp = Blueprint("products", __name__)

@products_bp.route("/products", methods=["GET"])
def get_products():

    products = Product.query.all()

    data = []

    for product in products:

        data.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "image": product.image
        })

    return jsonify(data)
@products_bp.route("/products", methods=["POST"])
def add_product():

    data = request.get_json()

    product = Product(
        name=data["name"],
        description=data["description"],
        category=data["category"],
        price=data["price"],
        image=data["image"]
    )

    db.session.add(product)
    db.session.commit()
    add_product_to_vector(product)
    return jsonify({
        "message": "Product added successfully",
        "id": product.id
    }), 201
@products_bp.route("/products/<int:id>", methods=["GET"])
def get_product_by_id(id):

    product = Product.query.get(id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    return jsonify({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "category": product.category,
        "price": product.price,
        "image": product.image
    })
@products_bp.route("/products/<int:id>", methods=["PUT"])
def update_product(id):

    product = Product.query.get(id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    data = request.get_json()

    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.category = data.get("category", product.category)
    product.price = data.get("price", product.price)
    product.image = data.get("image", product.image)

    db.session.commit()

    return jsonify({
        "message": "Product updated successfully"
    })
@products_bp.route("/products/search", methods=["GET"])
def search_product():

    query = request.args.get("q", "").strip()

    if not query:
        return jsonify({
            "message": "Search query is required"
        }), 400

    products = Product.query.filter(
        or_(
            Product.name.ilike(f"%{query}%"),
            Product.description.ilike(f"%{query}%"),
            Product.category.ilike(f"%{query}%")
        )
    ).all()

    result = []

    for product in products:
        result.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "image": product.image
        })

    return jsonify(result)
@products_bp.route("/products/category/<string:category>", methods=["GET"])
def filter_by_category(category):

    products = Product.query.filter_by(category=category).all()

    result = []

    for product in products:
        result.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "image": product.image
        })

    return jsonify(result)

@products_bp.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    product = Product.query.get(id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Product deleted successfully"
    })
@products_bp.route("/products/sync", methods=["POST"])
def sync_products():

    products = Product.query.all()

    # Purana vector data delete
    try:
        all_data = collection.get()

        if all_data["ids"]:
            collection.delete(ids=all_data["ids"])

    except Exception:
        pass

    count = 0

    for product in products:
        add_product_to_vector(product)
        count += 1

    return jsonify({
        "message": "Products synced successfully",
        "total_products": count
    })
@products_bp.route("/products/trending", methods=["GET"])
def trending_products():

    trending = (
        db.session.query(
            Product,
            func.count(Event.id).label("views")
        )
        .join(Event, Product.id == Event.product_id)
        .filter(Event.event_type == "view")
        .group_by(Product.id)
        .order_by(func.count(Event.id).desc())
        .limit(5)
        .all()
    )

    result = []

    for product, views in trending:
        result.append({
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "price": product.price,
            "image": product.image,
            "views": views
        })

    return jsonify(result)
@products_bp.route("/products/import", methods=["POST"])
def import_products():

    response = requests.get(
        "https://dummyjson.com/products?limit=100",
        timeout=15
    )

    if response.status_code != 200:
        return jsonify({
            "message": "External product API failed"
        }), 502

    external_data = response.json()

    products = external_data.get("products", [])

    imported = 0

    for item in products:

        product = Product(
            name=item.get("title"),
            description=item.get("description"),
            category=item.get("category"),
            price=item.get("price"),
            image=item.get("thumbnail")
        )

        db.session.add(product)
        db.session.flush()

        add_product_to_vector(product)

        imported += 1

    db.session.commit()

    return jsonify({
        "message": "Products imported successfully",
        "imported": imported
    }), 201