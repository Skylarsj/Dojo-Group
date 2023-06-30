from flask import Flask
from server import app
from server.routes import userRoutes, pokemonRoutes

app.config['SESSION_COOKIE_SECURE'] = True  # Ensure the session cookie is sent over HTTPS only
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Set the SameSite attribute to 'Lax' for better security

if __name__ == "__main__":
    app.run(debug=True)
