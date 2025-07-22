from flask import Flask,make_response, Blueprint, Response, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from routes import routes
from flask import Flask, render_template
from routes.dec_fun.db_management import init_db
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db = init_db(app)
    
    app.register_blueprint(routes)
    
    @app.route('/')
    def index():
        return render_template('index.html')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5005, debug= True)