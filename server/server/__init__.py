from flask import Flask
from flask_session import Session
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()
app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True  # Enable secure session cookie (HTTPS only)
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Restrict cookie access to HTTP only
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax' # Set SameSite attribute for session cookie
Session(app)
CORS(app, supports_credentials = True, origins = ["http://localhost:5173"])

app.secret_key = "oooh, so secret!"

if __name__ == "__main__":
    app.run(debug=True)
