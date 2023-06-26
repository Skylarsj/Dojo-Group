from server.config.mysqlconnection import connectToMySQL, jsonify

from server.models import pokemonModel

db = 'pokemon'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class User:
  def __init__( self , db_data ):
    self.id = db_data['id']
    self.username = db_data['username']
    self.email = db_data['email']
    self.password = db_data['password']
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
  def get_email(cls, form_data):
    query = "SELECT * FROM user WHERE email = %(email)s;"
    results = connectToMySQL(db).query_db(query, form_data)
    if len(results) < 1:
        return False
    return cls(results[0])
  
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
                'user_id' : row['user_id'],
                'name': row['name'],
                'SpriteURL': row['SpriteURL'],
                'created_at': row['pokemon.created_at'],
                'updated_at': row['pokemon.updated_at']
            }
          user.pokemon.append( pokemonModel.Pokemon(n) )
      return user

  @staticmethod
  def validate_User(user):
    is_valid = True # we assume this is true
    query = "SELECT * FROM user WHERE email = %(email)s;"
    results = connectToMySQL(db).query_db(query,user)
    if len(results) >= 1:
      error_message = "Email already taken." 
      is_valid = False
      return jsonify({'error': True, 'message': error_message})
     
    if len(user['first_name']) < 2:
      error_message = "First Name must be at least 2 characters."
      is_valid = False
      return jsonify({'error': True, 'message': error_message})
     
    if len(user['last_name']) < 2:
      error_message = "Last Name must be at least 2 characters."
      is_valid = False
      return jsonify({'error': True, 'message': error_message})
      
    if not EMAIL_REGEX.match(user['email']): 
      error_message ="Invalid email address!" 
      is_valid = False
      return jsonify({'error': True, 'message': error_message})
      
    if len(user['password']) < 8:
      error_message = "Password must be at least 8 characters." 
      is_valid = False
      return jsonify({'error': True, 'message': error_message})
      
    if (user['password']) != user['confirm_password']:
      error_message = "Passwords do not match." ,"register"
      is_valid = False
      return jsonify({'error': True, 'message': error_message})
      
    return is_valid

  @staticmethod
  def validate_login(form_data):
    if not EMAIL_REGEX.match(form_data['email']):
      error_message = "Invalid email/password."
      return jsonify({'error': True, 'message': error_message}), False
    

    user = User.get_by_email(form_data)
    if not user:
     error_message = "Invalid email/password."
     return jsonify({'error': True, 'message': error_message}), False
        
    if not bcrypt.check_password_hash(user.password, form_data['password']):
      error_message = "Invalid email/password."
      return jsonify({'error': True, 'message': error_message}), False
        
    return user