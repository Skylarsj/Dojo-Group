import os
from flask import Flask
from __init__ import app
# from server.routes.userRoutes import register, login, logout
# from server.routes.pokemonRoutes import all_pokemon

app = Flask(__name__)
if __name__ == "__main__":
  app.run(debug=True)

print(os.getcwd())