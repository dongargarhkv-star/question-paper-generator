"""
upload_api.py

Upload Question Bank (PDF/DOCX)
"""

import os

from flask import Blueprint
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename

from config import Config

upload_bp = Blueprint("upload_bp", __name__)


def allowed_file(filename):
    """
    Check allowed file extension.
    """

    if "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()

    return extension in Config.ALLOWED_EXTENSIONS


@upload_bp.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Upload API Working"
    })


@upload_bp.route("/question-bank", methods=["POST"])
def upload_question_bank():

    if "file" not in request.files:

        return jsonify({
            "error": "No file selected"
        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({
            "error": "No filename"
        }), 400

    if not allowed_file(file.filename):

        return jsonify({
            "error": "Only PDF and DOCX files are allowed."
        }), 400

    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        Config.UPLOAD_FOLDER,
        filename
    )

    file.save(filepath)

    return jsonify({

        "message": "File uploaded successfully",

        "filename": filename,

        "location": filepath

    }), 201
