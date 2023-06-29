from flask import Flask
from flask_session import Session
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)


app.secret_key = 'your-secret-key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = 'Dojo-Group/sessions'  # Replace with your desired session file directory
app.config['SESSION_USE_SIGNER'] = True  # Enable signed session cookies
# app.config['SESSION_COOKIE_SECURE'] = True  # Require HTTPS for session cookies
# app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to session cookies
app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_PERMANENT'] = False  # Session expires when the browser is closed
app.config['SESSION_JSON'] = True  # Store session data as JSON


Session(app)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

import server.routes.userRoutes