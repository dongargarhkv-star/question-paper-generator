from flask import Flask, jsonify
from flask_cors import CORS

# Import database
from database import db

# Import configuration
from config import Config

# Import API Blueprints
from api.upload_api import upload_bp
from api.question_api import question_bp
from api.generate_api import generate_bp
from api.blueprint_api import blueprint_bp
from api.auth_api import auth_bp


def create_app():
    """
    Creates and configures the Flask application.
    """

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Initialize database
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(upload_bp, url_prefix="/api/upload")
    app.register_blueprint(question_bp, url_prefix="/api/questions")
    app.register_blueprint(generate_bp, url_prefix="/api/generate")
    app.register_blueprint(blueprint_bp, url_prefix="/api/blueprint")

    # Home Route
    @app.route("/")
    def home():
        return jsonify({
            "application": "AI Question Paper Generator",
            "version": "1.0.0",
            "status": "Running",
            "developer": "OpenAI + User"
        })

    # Health Check
    @app.route("/health")
    def health():
        return jsonify({
            "status": "Healthy"
        })

    # Create database tables
    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
