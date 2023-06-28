from flask import redirect, render_template, request, session, jsonify
from server import app
from server.controllers.userController import create_user, login, logout


@app.route('/')
def index():
    print("hello world")
    return jsonify({"message": "Hello World"})


@app.route('/api/register', methods=['POST'])
def register():
    print("registration route")
    data = request.get_json()
    result = create_user(data)
    print(result)
    if result['error']:
        print(result)
        return jsonify(result), 400  # Return error response with status code 400
    else :
        return jsonify(result), 201  # Return success response with status code 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    result = login(email, password)

    if result['error']:
        return jsonify(result), 401  # Return unauthorized response with status code 401

    return jsonify(result), 200  # Return success response with status code 200

@app.route('/logout')
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200  # Return success response with status code 200

