# 📚 AI Question Paper Generator

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-3.x-green)
![React](https://img.shields.io/badge/React-19-blue)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Overview

The **AI Question Paper Generator** is a web application that allows teachers to upload question banks in **PDF** or **DOCX** format, organize them chapter-wise, create a blueprint, and automatically generate professionally formatted question papers.

The system eliminates manual paper creation while ensuring:

- No duplicate questions
- Chapter-wise weightage
- Marks distribution
- Difficulty balancing
- Randomized question selection
- Multiple paper sets

---

# ✨ Features

## 👨‍🏫 Teacher Module

- Secure Login
- Upload Question Bank
- Upload DOCX/PDF
- Edit Questions
- Delete Questions
- Search Questions
- Preview Questions

---

## 📚 Question Bank

Each question stores

- Subject
- Class
- Chapter
- Marks
- Difficulty
- Question Type
- Answer
- Bloom Level
- CO Mapping

---

## 📄 Blueprint Builder

Example

| Marks | No. Questions |
|--------|--------------|
| 1 | 5 |
| 2 | 10 |
| 3 | 5 |
| 5 | 4 |

Teachers can also define

- Chapter Weightage
- Difficulty Ratio
- Total Marks
- Time Duration

---

## 🤖 Automatic Paper Generation

The system

- Filters questions
- Removes duplicates
- Randomly selects questions
- Matches blueprint
- Generates PDF
- Generates DOCX

---

## 📥 Supported Formats

### Upload

- PDF
- DOCX

### Download

- PDF
- DOCX

---

# 🏗 Project Structure

```
question-paper-generator/

backend/
frontend/
uploads/
generated_papers/
database/
docs/
tests/
```

---

# 🛠 Technology Stack

## Frontend

- ReactJS
- Bootstrap
- Axios

## Backend

- Flask
- SQLAlchemy

## Database

- SQLite
- PostgreSQL

## Python Libraries

- pdfplumber
- python-docx
- reportlab
- pandas
- PyPDF2

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/question-paper-generator.git
```

---

## Backend

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux

```bash
source venv/bin/activate
```

Install Packages

```bash
pip install -r requirements.txt
```

Run

```bash
python app.py
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🗄 Database Schema

Question

```
id
subject
class
chapter
question
marks
difficulty
answer
blooms_level
co_mapping
```

---

# 📑 Workflow

Teacher Uploads PDF

↓

Text Extraction

↓

Question Parser

↓

Database Storage

↓

Blueprint Creation

↓

Question Selection

↓

Generate PDF

↓

Download

---

# 📸 Screenshots

Add screenshots here

```
docs/screenshots/dashboard.png

docs/screenshots/upload.png

docs/screenshots/generator.png
```

---

# 🚀 Future Improvements

- AI Question Classification
- OCR for Scanned PDFs
- Automatic Answer Key
- Multiple Paper Sets
- Hindi/English Support
- Bloom Taxonomy Detection
- Question Similarity Detection
- Cloud Deployment

---

# 📌 API Modules

- Authentication API
- Upload API
- Question API
- Blueprint API
- Paper Generator API

---

# 👨‍💻 Author

Your Name

M.Tech Computer Science Project

---

# 📜 License

MIT License
