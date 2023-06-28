from server.models.userModel import User
from flask_bcrypt import Bcrypt
from flask import session

bcrypt = Bcrypt()

def create_user(data):
    validation_result = User.validate_User(data)
    if validation_result['error']:
        return validation_result

    pw_hash = bcrypt.generate_password_hash(data['password'])
    print(pw_hash)

    data['password'] = pw_hash
    user_id = User.save_user(data)
    if not user_id:
        return {'error': True, 'message': 'Failed to create user'}

    print(data)
    return {'error': False, 'user_id': user_id}

def login(email, password):
  data = {"email": email}
  user_in_db = User.get_email(data)

  if not user_in_db:
    return {'error': True, 'message': 'Email does not exist'}

  if not bcrypt.check_password_hash(user_in_db.password, password):
    return {'error': True, 'message': 'Incorrect password'}

  return {'error': False, 'user_id': user_in_db.id}
# I ADDED THIS IN LOL
def logout():
  session.clear()
  return {'message': 'Logged out successfully'}
