"""
generator.py

Question Paper Generator

Selects random questions from the database
according to the blueprint.
"""

import random

from models import Question


class PaperGenerator:

    @staticmethod
    def get_questions_by_marks(marks, count):

        questions = Question.query.filter_by(
            marks=marks
        ).all()

        if len(questions) < count:

            raise Exception(
                f"Only {len(questions)} questions available for {marks} marks."
            )

        return random.sample(questions, count)

    @staticmethod
    def generate_paper(blueprint):

        paper = []

        question_number = 1

        blueprint_order = [

            (1, blueprint["one_mark"]),

            (2, blueprint["two_mark"]),

            (3, blueprint["three_mark"]),

            (5, blueprint["five_mark"])

        ]

        for marks, count in blueprint_order:

            if count == 0:
                continue

            questions = PaperGenerator.get_questions_by_marks(
                marks,
                count
            )

            for q in questions:

                paper.append({

                    "question_no": question_number,

                    "question": q.question_text,

                    "marks": q.marks

                })

                question_number += 1

        return paper
