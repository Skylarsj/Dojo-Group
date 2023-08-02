from server.models.userModel import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def create_user(data):
    print("create_user")
    new_user = User.validate_User(data)
    print(new_user)
    if new_user is None:
        return {'error': True, 'message': new_user}
    
    if new_user.get('error'):
        return new_user

    pw_hash = bcrypt.generate_password_hash(data['password'])

    data['password'] = pw_hash

    User.save_user(data)

    return new_user

def validate_login(data):
    valid_user = User.login_validation(data)
    if not valid_user:
        return {'error': True, 'message': 'Username does not exist'}

    return valid_user