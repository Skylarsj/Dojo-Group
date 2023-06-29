from server.models.userModel import User
from flask_bcrypt import Bcrypt
from flask import session

bcrypt = Bcrypt()

def create_user(data):
  print("create_user")
  new_user = User.validate_User(data)
  if not new_user:
    return {'error': True, 'message': 'Invalid user data'}

  pw_hash = bcrypt.generate_password_hash(data['password'])

  data['password'] = pw_hash
  
  User.save_user(data)

  return new_user

def login(data):
  user_in_db = User.get_username(data['username'])
  if not user_in_db:
    return {'error': True, 'message': 'Username does not exist'}
  
  if not bcrypt.check_password_hash(user_in_db['password'], data['password']):
    print("passwords don't match")
    return {'error': True, 'message': 'Incorrect password'}

  return {'error': False, 'user_id': user_in_db['id']}
# I ADDED THIS IN LOL
def logout():
  session.clear()
  return {'message': 'Logged out successfully'}
