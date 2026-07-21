import os

# Base directory of the backend folder
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    """
    Application Configuration
    """

    # Flask
    SECRET_KEY = os.environ.get(
        "SECRET_KEY",
        "change_this_to_a_secure_random_secret_key"
    )

    # SQLite Database
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
        BASE_DIR,
        "question_paper.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Upload Folder
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    # Generated Papers Folder
    GENERATED_FOLDER = os.path.join(BASE_DIR, "generated_papers")

    # Maximum upload size (20 MB)
    MAX_CONTENT_LENGTH = 20 * 1024 * 1024

    # Allowed file extensions
    ALLOWED_EXTENSIONS = {
        "pdf",
        "docx"
    }

    # Paper Defaults
    DEFAULT_SCHOOL = "Kendriya Vidyalaya"

    DEFAULT_TIME = "3 Hours"

    DEFAULT_MAX_MARKS = 70

    # PDF Settings
    PAGE_SIZE = "A4"

    FONT_NAME = "Helvetica"

    FONT_SIZE = 12

    TITLE_FONT_SIZE = 16

    MARGIN = 50

    LINE_HEIGHT = 22

    # Question Difficulty Levels
    DIFFICULTY_LEVELS = [
        "Easy",
        "Medium",
        "Hard"
    ]

    # Bloom's Taxonomy
    BLOOMS_LEVELS = [
        "Remember",
        "Understand",
        "Apply",
        "Analyze",
        "Evaluate",
        "Create"
    ]

    # Default Paper Sections
    PAPER_SECTIONS = [
        "Section A",
        "Section B",
        "Section C",
        "Section D"
    ]
