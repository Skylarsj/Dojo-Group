from flask import redirect, render_template, request, session, jsonify
from server import app
from server.controllers.userController import create_user, validate_login


@app.route('/')
def index():
    username = session.get('username')
    print(username)
    print("hello world")
    return jsonify({"message": "Hello World"})

@app.route("/api/check-login")
def check_login():
    print("checking login")
    print("Session data:", session)
    if 'username' in session:
        print("User is logged in")
        return jsonify({'logged_in': True, 'username':['username'], 'user_id':['user_id']})
    else:
        print("User is not logged in")
        return jsonify({"logged_in": False})

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

@app.route('/api/login', methods=['POST'])
def loginRoute():
    data = request.get_json()
    result = validate_login(data)
    print(session)
    if 'error' in result and result['error']:
        return jsonify(result), 401 
    
    print("HERE ARE THE RESULTS", result)
    
    if 'error' in result and not result['error']:
        
        return jsonify({'results': result, 'username':['username']}), 200
    
@app.route('/api/logout')
def logout():
    print("Logging out...")
    session.clear()  # Clear session data on the server-side

    response = jsonify({'message': 'Logged out successfully'})
    response.set_cookie('session', '', expires=0, domain='localhost', secure=True, httponly=True, samesite='None')

    print("Session data after logout:", session)
    print("Response data after logout:", response)
    return response, 200  # Return success response with status code 200