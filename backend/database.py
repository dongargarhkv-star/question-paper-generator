"""
database.py

Initializes the SQLAlchemy database object.
All models will import 'db' from this file.
"""

from flask_sqlalchemy import SQLAlchemy

# Create SQLAlchemy instance
db = SQLAlchemy()


def init_db(app):
    """
    Initialize database with Flask application.
    """
    db.init_app(app)

    with app.app_context():
        db.create_all()
