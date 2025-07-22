Notes Web App

A simple yet powerful note-taking application built with Flask backend and modern HTML/CSS/JS frontend. This application allows users to create, read, update, and delete notes with additional features like search and dark mode.

Features

    CRUD Operations: Create, Read, Update, and Delete notes

    Search Functionality: Instantly search through your notes

    Dark Mode: Toggle between light and dark themes

    Responsive Design: Works on mobile, tablet, and desktop

    Clean UI: Modern interface with smooth transitions

    Timestamps: Track when notes were created and last updated

Technologies Used
Backend

    Python 3

    Flask (web framework)

    SQLAlchemy (ORM)

    SQLite (database)

Frontend

    HTML5

    CSS3 (with CSS Variables for theming)

    JavaScript (ES6)

    Fetch API for AJAX requests

Project Structure
text

notes-app/
├── app.py                 # Main application entry point
├── config.py              # Application configuration    
├── routes/
│   ├── notes_management/
│   │   ├── __init__.py
│   │   ├── notes.py       # Note-related routes
│   │   ├── process_notes.py # Note business logic
│   │   └── constants.py   # Constants and messages
│   │
├───├── dec_fun/
│   │   ├── secret_info.py     # Secret keys and configuration
│   │   └── db_management.py   # Database setup and utilities
│   |   └── notes_models.py    # Note database model
│   └── __init__.py
├── static/
│   ├── style.css          # Main stylesheet
│   └── script.js          # Main JavaScript file
├── templates/
│   └── index.html         # Main HTML template
├── requirements.txt       # Python dependencies
└── README.md              # This file

Getting Started
Prerequisites

    Python 3.8+

    pip package manager

Installation

    Clone the repository:

bash

git clone https://github.com/N-Shah-Se/assisment_notes_app.git
cd assisment_notes_app

    Create and activate a virtual environment:

bash

python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows

    Install dependencies:

bash

pip install -r requirements.txt

Running the Application
bash

python app.py

The application will be available at http://localhost:5005
Usage

    Create a note: Enter title and content, click "Save Note"

    Edit a note: Click the "Edit" button on a note

    Delete a note: Click the "Delete" button on a note

    Search notes: Type in the search box to filter notes

    Toggle dark mode: Click the moon icon in the top-right corner

API Endpoints
Endpoint	Method	Description
/	GET	Main application UI
/get/notes	GET	Get all notes (optional ?search= parameter)
/get/notes/<id>	GET	Get a specific note by ID
/add/notes	POST	Create a new note
/update/notes/<id>	POST	Update an existing note
/delete/notes/<id>	POST	Delete a note
Development
Project Setup

    Follow the installation steps above

    Make sure to activate your virtual environment before working

Code Style

    Follow PEP 8 for Python code

    Use consistent indentation (4 spaces)

    Keep functions small and focused

    Add comments where necessary

Testing

To test the application:

    Run the development server: python app.py

    Open your browser to http://localhost:5005

    Test all CRUD operations and search functionality

    Verify dark mode toggle works and persists

Future Improvements

    User authentication

    Note categorization with tags

    Rich text editing

    Note sharing functionality

    Database migration to PostgreSQL

    Unit and integration tests

    Docker containerization