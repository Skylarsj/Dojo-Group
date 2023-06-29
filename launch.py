import os
from flask import Flask
from server import app

if __name__ == "__main__":
    app.run(debug=True)
    print(os.getcwd())
