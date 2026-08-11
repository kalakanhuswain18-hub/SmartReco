import os
from flask import Flask
from flask_cors import CORS
from config import Config
from models import db

from routes.products import products_bp
from routes.recommendations import recommendation_bp
from routes.events import events_bp
from routes.auth import auth_bp
from routes.wishlist import wishlist_bp
from routes.orders import orders_bp

app = Flask(__name__)
app.config.from_object(Config)

FRONTEND_URLS = [
    "http://localhost:5173",
    "https://smart-reco-eight.vercel.app",
    "https://smart-reco-gfyvpydhh-kk-416d.vercel.app",
]

CORS(
    app,
    resources={r"/*": {"origins": FRONTEND_URLS}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(products_bp)
app.register_blueprint(recommendation_bp)
app.register_blueprint(events_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(wishlist_bp)
app.register_blueprint(orders_bp)


@app.route("/")
def home():
    return {
        "project": "SmartReco",
        "status": "Running",
        "message": "Welcome to SmartReco API"
    }


if __name__ == "__main__":
    app.run(debug=True)