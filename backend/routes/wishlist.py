from flask import Blueprint, request, jsonify
from models import db, Wishlist, Product

wishlist_bp = Blueprint("wishlist", __name__)


@wishlist_bp.route("/wishlist", methods=["POST"])
def add_to_wishlist():

    data = request.get_json()

    user_id = data.get("user_id")
    product_id = data.get("product_id")

    if not user_id or not product_id:
        return jsonify({
            "message": "user_id and product_id are required"
        }), 400

    existing = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if existing:
        return jsonify({
            "message": "Product already in wishlist"
        }), 409

    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    wishlist = Wishlist(
        user_id=user_id,
        product_id=product_id
    )

    db.session.add(wishlist)
    db.session.commit()

    return jsonify({
        "message": "Product added to wishlist"
    }), 201


@wishlist_bp.route("/wishlist/<int:user_id>", methods=["GET"])
def get_wishlist(user_id):

    wishlist_items = Wishlist.query.filter_by(
        user_id=user_id
    ).all()

    products = []

    for item in wishlist_items:

        product = Product.query.get(item.product_id)

        if product:
            products.append({
                "id": product.id,
                "title": product.name,
                "price": product.price,
                "category": product.category,
                "image": product.image
            })

    return jsonify(products), 200


@wishlist_bp.route(
    "/wishlist/<int:user_id>/<int:product_id>",
    methods=["DELETE"]
)
def remove_from_wishlist(user_id, product_id):

    item = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not item:
        return jsonify({
            "message": "Product not found in wishlist"
        }), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({
        "message": "Product removed from wishlist"
    }), 200