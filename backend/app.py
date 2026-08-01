from flask import Flask
from flask_cors import CORS
from config import Config
from models import db

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {
        "project": "SmartReco",
        "status": "Running",
        "message": "Welcome to SmartReco API"
    }


if __name__ == "__main__":
    app.run(debug=True)