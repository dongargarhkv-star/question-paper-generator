"""
models.py

Database models for the AI Question Paper Generator.
"""

from datetime import datetime
from database import db


# ==========================
# Teacher Model
# ==========================

class Teacher(db.Model):

    __tablename__ = "teachers"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Teacher {self.name}>"



# ==========================
# Subject Model
# ==========================

class Subject(db.Model):

    __tablename__ = "subjects"

    id = db.Column(db.Integer, primary_key=True)

    subject_name = db.Column(db.String(100), nullable=False)

    class_name = db.Column(db.String(20), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Subject {self.subject_name}>"



# ==========================
# Chapter Model
# ==========================

class Chapter(db.Model):

    __tablename__ = "chapters"

    id = db.Column(db.Integer, primary_key=True)

    subject_id = db.Column(
        db.Integer,
        db.ForeignKey("subjects.id"),
        nullable=False
    )

    chapter_name = db.Column(db.String(150), nullable=False)

    def __repr__(self):
        return f"<Chapter {self.chapter_name}>"



# ==========================
# Question Model
# ==========================

class Question(db.Model):

    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)

    subject_id = db.Column(
        db.Integer,
        db.ForeignKey("subjects.id"),
        nullable=False
    )

    chapter_id = db.Column(
        db.Integer,
        db.ForeignKey("chapters.id"),
        nullable=False
    )

    question_text = db.Column(db.Text, nullable=False)

    answer = db.Column(db.Text)

    marks = db.Column(db.Integer, nullable=False)

    difficulty = db.Column(db.String(20), default="Medium")

    blooms_level = db.Column(db.String(50))

    question_type = db.Column(db.String(50))

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<Question {self.id}>"



# ==========================
# Blueprint Model
# ==========================

class Blueprint(db.Model):

    __tablename__ = "blueprints"

    id = db.Column(db.Integer, primary_key=True)

    blueprint_name = db.Column(
        db.String(100),
        nullable=False
    )

    class_name = db.Column(db.String(20))

    subject = db.Column(db.String(100))

    total_marks = db.Column(db.Integer)

    duration = db.Column(db.String(50))

    one_mark = db.Column(db.Integer, default=0)

    two_mark = db.Column(db.Integer, default=0)

    three_mark = db.Column(db.Integer, default=0)

    five_mark = db.Column(db.Integer, default=0)

    easy_percentage = db.Column(db.Integer, default=30)

    medium_percentage = db.Column(db.Integer, default=50)

    hard_percentage = db.Column(db.Integer, default=20)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<Blueprint {self.blueprint_name}>"



# ==========================
# Generated Paper Model
# ==========================

class GeneratedPaper(db.Model):

    __tablename__ = "generated_papers"

    id = db.Column(db.Integer, primary_key=True)

    blueprint_id = db.Column(
        db.Integer,
        db.ForeignKey("blueprints.id")
    )

    pdf_path = db.Column(db.String(300))

    generated_on = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    generated_by = db.Column(db.String(100))

    def __repr__(self):
        return f"<GeneratedPaper {self.id}>"
