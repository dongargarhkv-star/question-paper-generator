"""
question_parser.py

Extract individual questions and marks
from the text extracted from PDF/DOCX.
"""

import re


class QuestionExtractor:

    @staticmethod
    def extract_questions(text):
        """
        Extract questions from plain text.

        Supported examples:

        1. What is Python? (2 Marks)

        2. Explain Compiler. (5 Marks)

        Q3. Define RAM (1 Mark)
        """

        questions = []

        # Split using numbering
        pattern = r'(?:Q?\d+[\.\)]\s*)(.*?)(?=(?:Q?\d+[\.\)]\s*)|$)'

        matches = re.findall(pattern, text, re.DOTALL)

        for item in matches:

            item = item.strip()

            if not item:
                continue

            marks = 1

            # Find marks
            mark_match = re.search(
                r'(\d+)\s*Mark',
                item,
                re.IGNORECASE
            )

            if mark_match:
                marks = int(mark_match.group(1))

                # Remove "(2 Marks)"
                item = re.sub(
                    r'\(?\d+\s*Marks?\)?',
                    '',
                    item,
                    flags=re.IGNORECASE
                ).strip()

            questions.append({

                "question": item,

                "marks": marks

            })

        return questions
