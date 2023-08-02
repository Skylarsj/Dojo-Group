from flask import Flask
from server import app
from server.routes import userRoutes, pokemonRoutes


@app.after_request
def add_cache_control_headers(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

app.config['SESSION_COOKIE_SECURE'] = True  # Ensure the session cookie is sent over HTTPS only
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Set the SameSite attribute to 'Lax' for better security

if __name__ == "__main__":
    app.run(debug=True)
