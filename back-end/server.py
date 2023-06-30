from flask import Flask
from server import app
from server.routes import userRoutes, pokemonRoutes
if __name__ == "__main__":
    app.run(debug=True)
