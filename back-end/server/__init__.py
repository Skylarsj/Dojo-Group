from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
import mysql.connector
import os

load_dotenv()
app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
