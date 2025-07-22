from routes.dec_fun.notes_models import Note
from routes.dec_fun.db_management import db
from flask import jsonify
from .constants import ERROR_MESSAGES, SUCCESS_MESSAGES
import traceback

def process_get_notes(search_term):
    try:
        search_term = search_term['search']
        query = Note.query
        if search_term:
            query = query.filter(Note.title.contains(search_term) | Note.content.contains(search_term))
        return query.all()
    except Exception as e:
        traceback.print_exc()


def process_get_note(note_id):
    note = Note.query.get(note_id)
    if note:
        return jsonify(note.to_dict())
    else:
        return jsonify({'error': 'Note not found'}), 404


def process_add_notes(data):
    if not data or 'title' not in data or 'content' not in data:
        return {'error': ERROR_MESSAGES['MISSING_FIELDS']}, 400
    
    new_note = Note(title=data['title'], content=data['content'])
    db.session.add(new_note)
    db.session.commit()
    return new_note.to_dict(), 201

def process_update_notes(note_id, data):
    note = Note.query.get(note_id)
    if not note:
        return {'error': ERROR_MESSAGES['NOTE_NOT_FOUND']}, 404
    
    if 'title' in data:
        note.title = data['title']
    if 'content' in data:
        note.content = data['content']
    
    db.session.commit()
    return note.to_dict(), 200

def process_delete_notes(note_id):
    note = Note.query.get(note_id)
    if not note:
        return {'error': ERROR_MESSAGES['NOTE_NOT_FOUND']}, 404
    
    db.session.delete(note)
    db.session.commit()
    return {'message': SUCCESS_MESSAGES['NOTE_DELETED']}, 200