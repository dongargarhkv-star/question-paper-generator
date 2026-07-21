"""
Blueprint API

Workflow

1. Teacher selects lessons.
2. System counts available questions in each lesson.
3. Generates a blueprint table.
4. Teacher fills required questions.
5. Saves blueprint.
"""

from flask import Blueprint, request, jsonify

from database import db
from models import Question

blueprint_bp = Blueprint("blueprint_bp", __name__)

# Temporary in-memory storage.
# Later this can be replaced with a database table.
saved_blueprints = []


# -------------------------------------------------------
# Home
# -------------------------------------------------------

@blueprint_bp.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Blueprint API Working"
    })


# -------------------------------------------------------
# Generate Blueprint Table
# -------------------------------------------------------

@blueprint_bp.route("/generate-table", methods=["POST"])
def generate_table():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "No data received."
        }), 400

    lessons = data.get("lessons")

    if not lessons:

        return jsonify({
            "error": "Please select at least one lesson."
        }), 400

    table = []

    for lesson in lessons:

        row = {

            "lesson": lesson,

            "available": {

                "1": Question.query.filter_by(
                    chapter_id=lesson,
                    marks=1
                ).count(),

                "2": Question.query.filter_by(
                    chapter_id=lesson,
                    marks=2
                ).count(),

                "3": Question.query.filter_by(
                    chapter_id=lesson,
                    marks=3
                ).count(),

                "4": Question.query.filter_by(
                    chapter_id=lesson,
                    marks=4
                ).count(),

                "5": Question.query.filter_by(
                    chapter_id=lesson,
                    marks=5
                ).count()
            },

            "required": {

                "1": 0,

                "2": 0,

                "3": 0,

                "4": 0,

                "5": 0
            }

        }

        table.append(row)

    return jsonify({

        "blueprint_table": table

    })


# -------------------------------------------------------
# Save Blueprint
# -------------------------------------------------------

@blueprint_bp.route("/save", methods=["POST"])
def save_blueprint():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "No data received."
        }), 400

    saved_blueprints.append(data)

    return jsonify({

        "message": "Blueprint Saved Successfully.",

        "blueprint_id": len(saved_blueprints)

    })


# -------------------------------------------------------
# View All Saved Blueprints
# -------------------------------------------------------

@blueprint_bp.route("/all", methods=["GET"])
def all_blueprints():

    return jsonify(saved_blueprints)


# -------------------------------------------------------
# View Single Blueprint
# -------------------------------------------------------

@blueprint_bp.route("/<int:blueprint_id>", methods=["GET"])
def single_blueprint(blueprint_id):

    if blueprint_id <= 0 or blueprint_id > len(saved_blueprints):

        return jsonify({

            "error": "Blueprint not found."

        }), 404

    return jsonify(saved_blueprints[blueprint_id-1])


# -------------------------------------------------------
# Delete Blueprint
# -------------------------------------------------------

@blueprint_bp.route("/delete/<int:blueprint_id>", methods=["DELETE"])
def delete_blueprint(blueprint_id):

    if blueprint_id <= 0 or blueprint_id > len(saved_blueprints):

        return jsonify({

            "error": "Blueprint not found."

        }), 404

    saved_blueprints.pop(blueprint_id-1)

    return jsonify({

        "message": "Blueprint Deleted Successfully."

    })
