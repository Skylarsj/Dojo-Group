from server.models.userModel import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def create_user(data):
    print("create_user")
    new_user = User.validate_user(data)
    print(new_user)
    if new_user is None:
        return {'error': True, 'message': 'Invalid user data'}
    
    if new_user.get('error'):
        return new_user

    pw_hash = bcrypt.generate_password_hash(data['password'])

    # Convert pw_hash to a string
    data['password'] = pw_hash.decode('utf-8')

    User.save_user(data)

    # Call get_new_user to retrieve the newly created user
    new_user = User.get_new_user(data['username'])
    if new_user is None:
        return {'error': True, 'message': 'Error retrieving new user'}

    return new_user



def validate_login(data):
    valid_user = User.login_validation(data)
    if valid_user['error']:
        return {'error': True, 'message': valid_user['message']}

    return valid_user