from server.config.mysqlconnection import connectToMySQL
from server.models import userModel
import json
import re

db = 'Pokemon'

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

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'nickname': self.nickname,
            'SpriteURL': self.SpriteURL,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @classmethod
    def save_pokemon(cls, newData):
        print("save_pokemon TO DATABASE")
        query = 'INSERT INTO pokemon(user_id, name, nickname, SpriteURL) VALUES(%(user_id)s, %(name)s, %(nickname)s, %(spriteURL)s);'
        return connectToMySQL(db).query_db(query, newData)
    

    @classmethod
    def get_all(cls, id):
        print("get_all POKEMON")
        query = 'SELECT * FROM pokemon JOIN user ON user.id = pokemon.user_id WHERE user_id = %(id)s;'
        results = connectToMySQL(db).query_db(query, id)
        pokemon_list = []
        for row in results:
            one_pokemon = cls(row)

            one_pokemon_user_data = {
                'id': row['user.id'],
                'username': row['username'],
                'email': row['email'],
                'password': row['password'],
                'normal_pokeballs': row['normal_pokeballs'],  # Add normal_pokeballs attribute
                'great_pokeballs': row['great_pokeballs'],  # Add great_pokeballs attribute
                'ultra_pokeballs': row['ultra_pokeballs'],  # Add ultra_pokeballs attribute
                'master_pokeballs': row['master_pokeballs'],  # Add master_pokeballs attribute
                'created_at': row['user.created_at'],
                'updated_at': row['user.updated_at']
            }

            user = userModel.User(one_pokemon_user_data)
            one_pokemon.user = user
            pokemon_list.append(one_pokemon.to_dict()) 

        return pokemon_list
    
    @classmethod
    def get_count(cls, id):
        print("get_all POKEMON")
        query = 'SELECT * FROM pokemon JOIN user ON user.id = pokemon.user_id WHERE user_id = %(id)s;'
        results = connectToMySQL(db).query_db(query, id)

        if not results:
            return 0

        count = 0
        for row in results:
            count += 1

        return count

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
            'normal_pokeballs': result['normal_pokeballs'],  # Add normal_pokeballs attribute
            'great_pokeballs': result['great_pokeballs'],  # Add great_pokeballs attribute
            'ultra_pokeballs': result['ultra_pokeballs'],  # Add ultra_pokeballs attribute
            'master_pokeballs': result['master_pokeballs'],  # Add master_pokeballs attribute
            'created_at': result['user.created_at'],
            'updated_at': result['user.updated_at']
        }
        this_pokemon.user = userModel.User(user_data)
        print("this is a pokemon",this_pokemon)
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
    def validate_pokemon(data):
        print ("Validating Pokemon")
        print (data)
        error_message = None

        error_messages = {}

        if len(data['nickname']) < 2:  # Add validation for nickname length
            error_message = "Nickname must be at least 2 characters."
            error_messages['badNickname'] = error_message
        if len(data['nickname']) > 32:  # Add validation for nickname length
            error_message = "Nickname must be less than 16 characters."
            error_messages['badNickname'] = error_message
        if error_messages:
            return {'error': True, 'message': error_messages}
        else:
            return {'error': False, 'message': "User is valid."}