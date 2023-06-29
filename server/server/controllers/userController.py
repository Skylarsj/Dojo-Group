from server.models.userModel import User
from flask_bcrypt import Bcrypt
from flask import session

bcrypt = Bcrypt()

def create_user(data):
    if not User.validate_User(data):
      return {'error': True, 'message': 'Invalid user data'}

    pw_hash = bcrypt.generate_password_hash(data['password'])
    print(pw_hash)

    data['password'] = pw_hash
    user_id = User.save_user(data)  # Assuming User.save_user returns the user ID
    if not user_id:
        return {'error': True, 'message': 'Failed to create user'}

    return {'error': False, 'user_id': user_id}

def login(email, password):
  data = {"email": email}
  user_in_db = User.get_email(data)

  if not user_in_db:
    return {'error': True, 'message': 'Email does not exist'}, False

  if not bcrypt.check_password_hash(user_in_db.password, password):
    return {'error': True, 'message': 'Incorrect password'}, False

  return {'error': False, 'user_id': user_in_db.id}
# I ADDED THIS IN LOL
def logout():
  session.clear()
  return {'message': 'Logged out successfully'}
