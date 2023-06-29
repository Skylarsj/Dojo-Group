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

def validate_login(data):
  valid_user = User.validate_login(data)
  if not valid_user:
    return {'error': True, 'message': 'Username does not exist'}

  return valid_user
