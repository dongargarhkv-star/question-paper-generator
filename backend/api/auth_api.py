"""
Authentication API
"""

from flask import Blueprint, request, jsonify

from database import db
from models import Teacher
from auth import hash_password, verify_password

auth_bp = Blueprint("auth_bp", __name__)


# --------------------------------------
# Home
# --------------------------------------
@auth_bp.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Authentication API Working"
    })


# --------------------------------------
# Register Teacher
# --------------------------------------
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:

        return jsonify({
            "error": "All fields are required."
        }), 400

    teacher = Teacher.query.filter_by(email=email).first()

    if teacher:

        return jsonify({
            "error": "Email already exists."
        }), 400

    new_teacher = Teacher(
        name=name,
        email=email,
        password=hash_password(password)
    )

    db.session.add(new_teacher)

    db.session.commit()

    return jsonify({

        "message": "Teacher Registered Successfully"

    }), 201


# --------------------------------------
# Login
# --------------------------------------
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")

    password = data.get("password")

    teacher = Teacher.query.filter_by(email=email).first()

    if teacher is None:

        return jsonify({
            "error": "Invalid Email"
        }), 404

    if verify_password(password, teacher.password):

        return jsonify({

            "message": "Login Successful",

            "teacher": {

                "id": teacher.id,

                "name": teacher.name,

                "email": teacher.email

            }

        })

    return jsonify({

        "error": "Incorrect Password"

    }), 401


# --------------------------------------
# Teacher Profile
# --------------------------------------
@auth_bp.route("/profile/<int:id>", methods=["GET"])
def profile(id):

    teacher = Teacher.query.get(id)

    if teacher is None:

        return jsonify({
            "error": "Teacher Not Found"
        }), 404

    return jsonify({

        "id": teacher.id,

        "name": teacher.name,

        "email": teacher.email

    })
