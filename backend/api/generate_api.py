"""
generate_api.py

Generates Question Paper
"""

from flask import Blueprint, request, jsonify
from models import Question
import random

generate_bp = Blueprint("generate_bp", __name__)


@generate_bp.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Question Paper Generator API Working"
    })


@generate_bp.route("/paper", methods=["POST"])
def generate_question_paper():

    data = request.get_json()

    blueprint = data.get("blueprint")

    if blueprint is None:

        return jsonify({
            "error": "Blueprint not provided."
        }), 400

    paper = []

    question_number = 1

    used_questions = set()

    for lesson in blueprint:

        lesson_name = lesson["lesson"]

        required = lesson["required"]

        lesson_questions = []

        for marks in [1, 2, 3, 4, 5]:

            count = required.get(str(marks), 0)

            if count == 0:
                continue

            questions = Question.query.filter_by(
                chapter_id=lesson_name,
                marks=marks
            ).all()

            if len(questions) < count:

                return jsonify({

                    "error":
                    f"Only {len(questions)} questions available "
                    f"for {lesson_name} ({marks} Marks)"

                }), 400

            selected = random.sample(questions, count)

            for q in selected:

                if q.id in used_questions:
                    continue

                used_questions.add(q.id)

                lesson_questions.append({

                    "question_no": question_number,

                    "lesson": lesson_name,

                    "question": q.question_text,

                    "marks": q.marks

                })

                question_number += 1

        paper.extend(lesson_questions)

    return jsonify({

        "status": "success",

        "total_questions": len(paper),

        "question_paper": paper

    })
