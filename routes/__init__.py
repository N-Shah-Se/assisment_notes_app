from flask import Blueprint

routes = Blueprint("routes", __name__)

from .NotesManagement.notes import *