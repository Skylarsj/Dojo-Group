from flask import redirect, render_template, request, session, jsonify
from flask_app import app
from server.controllers.userController import create_user, login, logout

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    result = create_user(data)

    if result['error']:
        return jsonify(result), 400  # Return error response with status code 400

    return jsonify(result), 201  # Return success response with status code 201

@app.route('/login', methods=['POST'])
def user_login_post():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    result = login(email, password)

    if result['error']:
        return jsonify(result), 401  # Return unauthorized response with status code 401

    return jsonify(result), 200  # Return success response with status code 200

@app.route('/logout')
def user_logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200  # Return success response with status code 200