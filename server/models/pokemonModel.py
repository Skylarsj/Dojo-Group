from server.config.mysqlconnection import connectToMySQL, jsonify, validators 

from server.models import userModel

db = 'pokemon'

class Pokemon:
    def __init__(self, db_data):
      self.id = db_data['id']
      self.user_id = db_data['user_id']
      self.name = db_data['name']
      self.SpriteURL = db_data['SpriteURL']
      self.created_at = db_data['created_at']
      self.updated_at = db_data['updated_at']
      self.user = None

    @classmethod
    def save_pokemon(cls, form_data):
      query = 'INSERT INTO pokemon(user_id, name, SpriteURL) VALUES(%(user_id)s, %(name)s, %(SpriteURL)s);'
      return connectToMySQL(db).query_db(query, form_data)
    
    @classmethod
    def get_all(cls):
      query = 'SELECT * FROM pokemon JOIN user ON pokemon.user_id = user.id;'
      results = connectToMySQL(db).query_db(query)
      pokemon = []
      for row in results:
        one_pokemon = cls(row)

        one_pokemon_user_data = {
          'id': row['user.id'],
          'username': row['username'],
          'email': row['email'],
          'password': row['password'],
          'created_at': row['user.created_at'],
          'updated_at': row['user.updated_at']
        }

        user = user.User(one_pokemon_user_data)
        one_pokemon.user = user
        pokemon.append(one_pokemon)
      return pokemon
  
    @classmethod
    def get_id(cls, data):
      query = "SELECT * FROM pokemon JOIN user on pokemon.user_id = user.id WHERE pokemon.id = %(id)s;"
      results = connectToMySQL(db).query_db(query, data)
      if not result:
        return False
      
      result = results[0]
      this_pokemon = cls(result)
      user_data = {
        'id': result['user.id'],
        'username': result['username'],
        'email': result['email'],
        'password': result['password'],
        'created_at': result['user.created_at'],
        'updated_at': result['user.updated_at']
      }
      this_pokemon.user = user.User(user_data)
      return this_pokemon

      
    
    @classmethod
    def update(cls, data):
      query = "UPDATE pokemon SET name = %(name)s, SpriteURL = %(SpriteURL)s WHERE id = %(id)s;"
      return connectToMySQL(db).query_db(query, data)
    
    @classmethod
    def delete(cls, data):
      query = "DELETE FROM pokemon WHERE id = %(id)s;"
      return connectToMySQL(db).query_db(query, data)
    

    # Not sure if we need this

    # @staticmethod
    # def validate_pokemon(form_data):
    #   is_valid = True
    #   if len(form_data['name']) < 3:
    #     error_message = "Name must be at least 3 characters."
    #     is_valid = False
    #     return jsonify({'error': True, 'message': error_message})
      
    #check if url is valid

    #   if validators.url(form_data['SpriteURL']) != True:
    #     error_message = "SpriteURL must be a valid URL."
    #     is_valid = False
    #     return jsonify({'error': True, 'message': error_message})
    #   return is_valid
    