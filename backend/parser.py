"""
parser.py

Reads PDF and DOCX files and extracts text.
Later, this text will be converted into individual questions.
"""

import os
import pdfplumber
from docx import Document


class QuestionParser:

    @staticmethod
    def read_pdf(file_path):
        """
        Read text from a PDF file.
        """

        text = ""

        try:

            with pdfplumber.open(file_path) as pdf:

                for page in pdf.pages:

                    page_text = page.extract_text()

                    if page_text:
                        text += page_text + "\n"

            return text

        except Exception as e:

            return f"Error reading PDF: {str(e)}"



    @staticmethod
    def read_docx(file_path):
        """
        Read text from a DOCX file.
        """

        try:

            document = Document(file_path)

            text = ""

            for paragraph in document.paragraphs:

                text += paragraph.text + "\n"

            return text

        except Exception as e:

            return f"Error reading DOCX: {str(e)}"



    @staticmethod
    def extract_text(file_path):
        """
        Automatically determine file type
        and extract text.
        """

        extension = os.path.splitext(file_path)[1].lower()

        if extension == ".pdf":

            return QuestionParser.read_pdf(file_path)

        elif extension == ".docx":

            return QuestionParser.read_docx(file_path)

        else:

            return "Unsupported file format."
