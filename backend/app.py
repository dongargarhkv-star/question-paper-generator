"""
Main Flask Application
"""

from flask import Flask
from flask_cors import CORS

from config import Config
from database import init_db

# Import APIs
from api.auth_api import auth_bp
from api.upload_api import upload_bp
from api.question_api import question_bp
from api.blueprint_api import blueprint_bp
from api.generate_api import generate_bp
from api.import_api import import_bp

app = Flask(__name__)

# Load Configuration
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize Database
init_db(app)


# -------------------------
# Register API Blueprints
# -------------------------
app.register_blueprint(

    import_bp,

    url_prefix="/api/import"

)

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    upload_bp,
    url_prefix="/api/upload"
)

app.register_blueprint(
    question_bp,
    url_prefix="/api/questions"
)

app.register_blueprint(
    blueprint_bp,
    url_prefix="/api/blueprint"
)

app.register_blueprint(
    generate_bp,
    url_prefix="/api/generate"
)


# -------------------------
# Home
# -------------------------

@app.route("/")
def home():

    return {

        "application": "AI Question Paper Generator",

        "version": "1.0",

        "status": "Running"

    }


# -------------------------
# Create Database Tables
# -------------------------

with app.app_context():

    from models import *

    from database import db

    db.create_all()


# -------------------------
# Run Server
# -------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
