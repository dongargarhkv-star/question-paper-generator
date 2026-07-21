"""
import_api.py

Imports Question Bank from PDF/DOCX

Teacher can choose

1. Review Mode
2. Auto Save Mode
"""

import os

from flask import Blueprint
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename

from config import Config
from parser import QuestionParser
from question_parser import QuestionExtractor

from database import db
from models import Question

import_bp = Blueprint("import_bp", __name__)


# ---------------------------------------------------------
# Import Question Bank
# ---------------------------------------------------------

@import_bp.route("/question-bank", methods=["POST"])
def import_question_bank():

    if "file" not in request.files:

        return jsonify({

            "error": "No file uploaded."

        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({

            "error": "No file selected."

        }), 400

    review_mode = request.form.get(
        "review_mode",
        "true"
    ).lower() == "true"

    subject_id = request.form.get("subject_id")

    chapter_id = request.form.get("chapter_id")

    filename = secure_filename(file.filename)

    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

    filepath = os.path.join(
        Config.UPLOAD_FOLDER,
        filename
    )

    file.save(filepath)

    # --------------------------
    # Extract Text
    # --------------------------

    text = QuestionParser.extract_text(filepath)

    # --------------------------
    # Extract Questions
    # --------------------------

    questions = QuestionExtractor.extract_questions(text)

    # --------------------------
    # REVIEW MODE
    # --------------------------

    if review_mode:

        return jsonify({

            "mode": "review",

            "total_questions": len(questions),

            "questions": questions

        })

    # --------------------------
    # AUTO SAVE MODE
    # --------------------------

    count = 0

    for q in questions:

        question = Question(

            subject_id=subject_id,

            chapter_id=chapter_id,

            question_text=q["question"],

            marks=q["marks"],

            difficulty="Medium",

            blooms_level="Remember",

            question_type="Theory"

        )

        db.session.add(question)

        count += 1

    db.session.commit()

    return jsonify({

        "mode": "auto",

        "saved_questions": count,

        "message": "Questions imported successfully."

    })


# ---------------------------------------------------------
# Save Reviewed Questions
# ---------------------------------------------------------

@import_bp.route("/save-reviewed", methods=["POST"])
def save_reviewed_questions():

    data = request.get_json()

    questions = data["questions"]

    subject_id = data["subject_id"]

    chapter_id = data["chapter_id"]

    count = 0

    for q in questions:

        question = Question(

            subject_id=subject_id,

            chapter_id=chapter_id,

            question_text=q["question"],

            marks=q["marks"],

            difficulty=q.get(
                "difficulty",
                "Medium"
            ),

            blooms_level=q.get(
                "blooms_level",
                "Remember"
            ),

            question_type=q.get(
                "question_type",
                "Theory"
            )

        )

        db.session.add(question)

        count += 1

    db.session.commit()

    return jsonify({

        "message": "Reviewed questions saved.",

        "saved": count

    })
