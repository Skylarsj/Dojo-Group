from server.config.mysqlconnection import connectToMySQL
import validators

from server.models import userModel
import re

db = 'pokemon'

class Pokemon:
    def __init__(self, db_data):
        self.id = db_data['id']
        self.user_id = db_data['user_id']
        self.name = db_data['name']
        self.nickname = db_data['nickname']  # Add the nickname attribute
        self.SpriteURL = db_data['SpriteURL']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']
        self.user = None

    @classmethod
    def save_pokemon(cls, form_data):
        query = 'INSERT INTO pokemon(user_id, name, nickname, SpriteURL) VALUES(%(user_id)s, %(name)s, %(nickname)s, %(SpriteURL)s);'
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

            user = userModel.User(one_pokemon_user_data)
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
        this_pokemon.user = userModel.User(user_data)
        return this_pokemon
    
    #This will only update the name of the pokemon
    #nickname pokemon
    @classmethod
    def update(cls, data):
        query = "UPDATE pokemon SET nickname = %(nickname)s WHERE id = %(id)s;"
        return connectToMySQL(db).query_db(query, data)
    
    #release pokemon
    @classmethod
    def delete(cls, data):
        query = "DELETE FROM pokemon WHERE id = %(id)s;"
        return connectToMySQL(db).query_db(query, data)


    @staticmethod
    def validate_pokemon(form_data):
        print ("Validating Pokemon")
        print (Pokemon)
        error_message = None

        error_messages = {}
       
        if len(Pokemon['nickname']) < 2:  # Add validation for nickname length
            error_message = "Nickname must be at least 2 characters."
            error_messages['badNickname'] = error_message
        if len(Pokemon['nickname']) > 16:  # Add validation for nickname length
            error_message = "Nickname must be less than 16 characters."

        if error_messages:
            return {'error': True, 'message': error_messages}
        else:
            return {'error': False, 'message': "User is valid."}

       