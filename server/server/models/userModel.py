from flask import jsonify
from server.config.mysqlconnection import connectToMySQL
from flask_bcrypt import Bcrypt
from server.models import pokemonModel
import re

bcrypt = Bcrypt()

db = 'Pokemon'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class User:
  def __init__( self , db_data ):
    self.id = db_data['id']
    self.username = db_data['username']
    self.email = db_data['email']
    self.password = db_data['password']
    self.pokeballs = db_data['pokeballs']
    self.created_at = db_data['created_at']
    self.updated_at = db_data['updated_at']
    self.pokemon = []

  @classmethod
  def save_user(cls, form_data):
    query= 'INSERT INTO user(username, email, password) VALUES( %(username)s, %(email)s, %(password)s );'
    return connectToMySQL(db).query_db(query, form_data)
  
  @classmethod
  def get_all(cls):
    query = 'SELECT * FROM user;'
    results = connectToMySQL(db).query_db(query)
    user = []
    for user in results:
      user.append(cls(user))
    return user

  @classmethod
  def get_username(cls, data):
    username = {'username': data['username']}
    query = "SELECT * FROM user WHERE username = %(username)s;"
    results = connectToMySQL(db).query_db(query, username)
    if not results:
        return None
    return results[0]
  
  @classmethod
  def get_id(cls,form_data):
    query = "SELECT * FROM user WHERE id = %(id)s;"
    results = connectToMySQL(db).query_db(query, form_data)
    return cls(results[0])

  @classmethod
  def get_one_with_pokemon(cls, data ):
      query = "SELECT * FROM user LEFT JOIN pokemon on user.id = pokemon.user_id WHERE user.id = %(id)s;"
      results = connectToMySQL(db).query_db(query,data)
      print(results)
      user = cls(results[0])
      for row in results:
          n = {
            'id': row['pokemon.id'],
            'user_id': row['user_id'],
            'name': row['name'],
            'SpriteURL': row['SpriteURL'],
            'pokeballs': row['pokeballs'],
            'created_at': row['created_at'],
            'updated_at': row['updated_at']
            }
          user.pokemon.append( pokemonModel.Pokemon(n) )
      return user
  
# validations work, no touchey! lol -sky
  def validate_User(user):
      print("Validating user...")
      print(user)
      error_message = None

      error_messages = {}

      query = "SELECT * FROM user WHERE email = %(email)s;"
      results = connectToMySQL(db).query_db(query, user)
      if results:
          error_message = "Email already taken."
          error_messages['oldEmail'] = error_message

      if len(user['username']) < 3:
          error_message = "Username must be at least 3 characters."
          error_messages['username'] = error_message

      if not EMAIL_REGEX.match(user['email']):
          error_message = "Invalid email address!"
          error_messages['email'] = error_message

      if len(user['password']) < 8:
          error_message = "Password must be at least 8 characters."
          error_messages['password'] = error_message

      if user['password'] != user['confirmPassword']:
          error_message = "Passwords do not match."
          error_messages['confirmPassword'] = error_message

      if error_messages:
          return {'error': True, 'message': error_messages}
      else:
          return {'error': False, 'message': "User is valid."}

  @staticmethod
  def validate_login(data):
    valid_user = User.get_username(data)
    print("in validate_login", valid_user)
    if not valid_user:
      error_message = "Invalid email/password."
      return jsonify({'error': True, 'message': error_message})
    if valid_user:
      if not bcrypt.check_password_hash(valid_user['password'], data['password']):
        return {'error': True, 'message': "Invalid email/password."}
    return {'error': False, 'message': "User is valid."}