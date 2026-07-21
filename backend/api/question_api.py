"""
question_api.py

API for managing questions.
"""

from flask import Blueprint, jsonify, request

from database import db
from models import Question

question_bp = Blueprint("question_bp", __name__)


# -------------------------------------------------
# Home
# -------------------------------------------------

@question_bp.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Question API Working"
    })


# -------------------------------------------------
# Get All Questions
# -------------------------------------------------

@question_bp.route("/all", methods=["GET"])
def get_all_questions():

    questions = Question.query.all()

    result = []

    for q in questions:

        result.append({

            "id": q.id,
            "question": q.question_text,
            "marks": q.marks,
            "difficulty": q.difficulty,
            "type": q.question_type,
            "blooms_level": q.blooms_level

        })

    return jsonify(result)


# -------------------------------------------------
# Add Question
# -------------------------------------------------

@question_bp.route("/add", methods=["POST"])
def add_question():

    data = request.get_json()

    new_question = Question(

        subject_id=data["subject_id"],

        chapter_id=data["chapter_id"],

        question_text=data["question"],

        answer=data.get("answer", ""),

        marks=data["marks"],

        difficulty=data.get("difficulty", "Medium"),

        question_type=data.get("question_type", "Theory"),

        blooms_level=data.get("blooms_level", "Remember")

    )

    db.session.add(new_question)

    db.session.commit()

    return jsonify({

        "message": "Question Added Successfully"

    }), 201


# -------------------------------------------------
# Get Question By ID
# -------------------------------------------------

@question_bp.route("/<int:question_id>", methods=["GET"])
def get_question(question_id):

    question = Question.query.get(question_id)

    if question is None:

        return jsonify({
            "error": "Question Not Found"
        }), 404

    return jsonify({

        "id": question.id,

        "question": question.question_text,

        "answer": question.answer,

        "marks": question.marks,

        "difficulty": question.difficulty,

        "question_type": question.question_type,

        "blooms_level": question.blooms_level

    })


# -------------------------------------------------
# Update Question
# -------------------------------------------------

@question_bp.route("/update/<int:question_id>", methods=["PUT"])
def update_question(question_id):

    question = Question.query.get(question_id)

    if question is None:

        return jsonify({
            "error": "Question Not Found"
        }), 404

    data = request.get_json()

    question.question_text = data.get(
        "question",
        question.question_text
    )

    question.answer = data.get(
        "answer",
        question.answer
    )

    question.marks = data.get(
        "marks",
        question.marks
    )

    question.difficulty = data.get(
        "difficulty",
        question.difficulty
    )

    question.question_type = data.get(
        "question_type",
        question.question_type
    )

    question.blooms_level = data.get(
        "blooms_level",
        question.blooms_level
    )

    db.session.commit()

    return jsonify({

        "message": "Question Updated Successfully"

    })


# -------------------------------------------------
# Delete Question
# -------------------------------------------------

@question_bp.route("/delete/<int:question_id>", methods=["DELETE"])
def delete_question(question_id):

    question = Question.query.get(question_id)

    if question is None:

        return jsonify({
            "error": "Question Not Found"
        }), 404

    db.session.delete(question)

    db.session.commit()

    return jsonify({

        "message": "Question Deleted Successfully"

    })


# -------------------------------------------------
# Filter By Marks
# -------------------------------------------------

@question_bp.route("/marks/<int:marks>", methods=["GET"])
def filter_marks(marks):

    questions = Question.query.filter_by(
        marks=marks
    ).all()

    result = []

    for q in questions:

        result.append({

            "id": q.id,

            "question": q.question_text,

            "marks": q.marks

        })

    return jsonify(result)
