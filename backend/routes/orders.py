from flask import Blueprint, request, jsonify
from models import db, Order, User, Product
from datetime import datetime


orders_bp = Blueprint("orders", __name__)


@orders_bp.route("/orders", methods=["POST"])
def create_order():

    data = request.get_json()

    user_id = data.get("user_id")
    product_id = data.get("product_id")

    if not user_id or not product_id:
        return jsonify({
            "message": "user_id and product_id are required"
        }), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    order_number = "SR" + datetime.utcnow().strftime("%H%M%S%f")[-8:]

    order = Order(
        order_number=order_number,
        user_id=user_id,
        product_id=product_id,
        price=product.price,
        status="Processing"
    )

    db.session.add(order)
    db.session.commit()

    return jsonify({
        "message": "Order placed successfully",
        "order": {
            "id": order.id,
            "order_number": order.order_number,
            "user_id": order.user_id,
            "product_id": order.product_id,
            "product": product.name,
            "price": order.price,
            "status": order.status,
            "created_at": order.created_at.isoformat()
        }
    }), 201


@orders_bp.route("/orders/<int:user_id>", methods=["GET"])
def get_orders(user_id):

    orders = (
        Order.query
        .filter_by(user_id=user_id)
        .order_by(Order.id.desc())
        .all()
    )

    result = []

    for order in orders:

        product = Product.query.get(order.product_id)

        result.append({
            "id": order.id,
            "order_number": order.order_number,
            "product_id": order.product_id,
            "product": product.name if product else "Unknown Product",
            "price": order.price,
            "image": product.image if product else None,
            "status": order.status,
            "created_at": order.created_at.isoformat()
        })

    return jsonify(result)