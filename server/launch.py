import os
from server import app
from server.routes.userRoutes import register, login, logout
# from server.routes.pokemonRoutes import all_pokemon

if __name__ == "__main__":
  app.run(debug=True)

print(os.getcwd())