from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
import mysql.connector
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.config['SESSION_PERMANENT'] = False
