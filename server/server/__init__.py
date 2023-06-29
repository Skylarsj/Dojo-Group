from flask import Flask
from flask_session import Session
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret secret, I got a secret'
app.config['SESSION_TYPE'] = 'mysql'
app.config['SESSION_SQLALCHEMY'] = f"mysql://root:${os.environ.get('DB_PASSWORD')}@localhost/pokemon"
Session(app)
CORS(app, supports_credentials = True, origins = ["http://localhost:5173"])


if __name__ == "__main__":
    app.run(debug=True)
