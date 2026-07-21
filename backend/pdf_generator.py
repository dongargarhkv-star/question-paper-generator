"""
pdf_generator.py

Creates a formatted Question Paper PDF.
"""

import os

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from config import Config


class PDFGenerator:

    @staticmethod
    def generate(question_paper,
                 school_name,
                 class_name,
                 subject,
                 exam_name,
                 time,
                 max_marks,
                 filename="question_paper.pdf"):

        os.makedirs(Config.GENERATED_FOLDER, exist_ok=True)

        filepath = os.path.join(
            Config.GENERATED_FOLDER,
            filename
        )

        c = canvas.Canvas(filepath, pagesize=A4)

        width, height = A4

        y = height - 50

        # -------------------------
        # Header
        # -------------------------

        c.setFont("Helvetica-Bold", 18)

        c.drawCentredString(
            width / 2,
            y,
            school_name
        )

        y -= 30

        c.setFont("Helvetica-Bold", 14)

        c.drawCentredString(
            width / 2,
            y,
            exam_name
        )

        y -= 30

        c.setFont("Helvetica", 12)

        c.drawString(
            40,
            y,
            f"Class : {class_name}"
        )

        c.drawRightString(
            width - 40,
            y,
            f"Subject : {subject}"
        )

        y -= 20

        c.drawString(
            40,
            y,
            f"Time : {time}"
        )

        c.drawRightString(
            width - 40,
            y,
            f"Maximum Marks : {max_marks}"
        )

        y -= 30

        c.line(40, y, width - 40, y)

        y -= 25

        current_section = None

        # -------------------------
        # Questions
        # -------------------------

        for q in question_paper:

            if current_section != q["lesson"]:

                current_section = q["lesson"]

                c.setFont("Helvetica-Bold", 13)

                c.drawString(
                    40,
                    y,
                    current_section
                )

                y -= 20

            c.setFont("Helvetica", 11)

            question = f'{q["question_no"]}. {q["question"]}'

            c.drawString(
                50,
                y,
                question[:100]
            )

            c.drawRightString(
                width - 50,
                y,
                f'[{q["marks"]}]'
            )

            y -= 22

            # New page if required
            if y < 70:

                c.showPage()

                y = height - 50

        c.save()

        return filepath
