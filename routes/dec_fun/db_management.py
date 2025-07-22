from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from .secret_info import DB_CONFIG

db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_CONFIG['db_name']}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = DB_CONFIG['echo']
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    return db

def get_current_utc():
    return datetime.now(timezone.utc)