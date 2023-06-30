from flask import Flask
from server import app
from server.controllers import userController, pokemonController
if __name__ == "__main__":
    app.run(debug=True)
