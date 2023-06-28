from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)
# Other configurations and routes...

if __name__ == "__main__":
    app.run(debug=True)
