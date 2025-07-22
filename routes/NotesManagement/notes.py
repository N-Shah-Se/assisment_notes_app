from routes import routes
from flask import request, jsonify
from flask_cors import cross_origin
import traceback
from .process_notes import (
    process_get_notes,
    process_get_note,
    process_add_notes,
    process_update_notes,
    process_delete_notes,
)


@routes.route("/add/notes", methods=["POST"])
@cross_origin(origin="*", headers=["Content- Type", "application/json"])
def add_notes():
    try:
        data = request.get_json()
        print(data)
        result, status_code = process_add_notes(data)
        return jsonify(result), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'SERVICE_FAILURE'}, 500)


@routes.route("/get/notes", methods=["GET"])
@cross_origin(origin="*", headers=["Content- Type", "application/json"])
def get_notes():
    try:
        print(request)
        body = {}
        body['search'] = request.args.get("search", "")
        notes = process_get_notes(body)
        return jsonify([note.to_dict() for note in notes])
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'SERVICE_FAILURE'}, 500)


@routes.route("/update/notes/<int:note_id>", methods=["POST"])
@cross_origin(origin="*", headers=["Content- Type", "application/json"])
def update_notes(note_id):
    try:
        data = request.get_json()
        print(data)
        result, status_code = process_update_notes(note_id, data)
        return jsonify(result), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'SERVICE_FAILURE'}, 500)


@routes.route("/delete/notes/<int:note_id>", methods=["POST"])
@cross_origin(origin="*", headers=["Content- Type", "application/json"])
def delete_notes(note_id):
    try:
        result, status_code = process_delete_notes(note_id)
        return jsonify(result), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'SERVICE_FAILURE'}, 500)


@routes.route("/get/notes/<int:note_id>", methods=["GET"])
@cross_origin(origin="*", headers=["Content- Type", "application/json"])
def get_note(note_id):
    try:
        return process_get_note(note_id)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'SERVICE_FAILURE'}), 500