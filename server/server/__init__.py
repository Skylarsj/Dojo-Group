from flask import Flask
from flask_session import Session
from dotenv import load_dotenv
from flask_cors import CORS
import mysql.connector
import os


load_dotenv()
app = Flask(__name__)


app.secret_key = 'your-secret-key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = 'Dojo-Group/sessions'  # Replace with your desired session file directory

Session(app)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])


if __name__ == "__main__":
    app.run(debug=True)