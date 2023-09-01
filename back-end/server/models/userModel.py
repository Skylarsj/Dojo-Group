from server.config.mysqlconnection import connectToMySQL
from flask_bcrypt import Bcrypt
from flask import jsonify
import re

bcrypt = Bcrypt()

db = 'Pokemon'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

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
        username = {'username': data}
        query = "SELECT * FROM user WHERE username = %(username)s;"
        results = connectToMySQL(db).query_db(query, username)
        if not results:
            return None
        return results[0]
    
    @classmethod
    def get_email(cls, data):
        email = {'email': data}
        query = "SELECT * FROM user WHERE email = %(email)s;"
        results = connectToMySQL(db).query_db(query, email)
        if not results:
            return None
        return results[0]
    
    @classmethod
    def get_by_id(cls, user_id):
        query = "SELECT * FROM user WHERE id = %(id)s;"
        result = connectToMySQL(db).query_db(query, {'id': user_id})
        if not result:
            return None
        return cls(result[0])

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

    @staticmethod
    def validate_user(data):
        print("Validating user...")
        print(data)

        if 'username' not in data:
            return {'error': True, 'message': 'Username is required.'}

        if len(data['username']) < 3:
            return {'error': True, 'message': 'Username must be at least 3 characters.'}

        existing_user = User.get_username(data['username'])
        if existing_user:
            return {'error': True, 'message': 'Username already exists.'}

        if 'email' not in data:
            return {'error': True, 'message': 'Email is required.'}

        if not EMAIL_REGEX.match(data['email']):
            return {'error': True, 'message': 'Invalid email.'}

        existing_email = User.get_email(data['email'])
        if existing_email:
            return {'error': True, 'message': 'Email already exists.'}

        if 'password' not in data:
            return {'error': True, 'message': 'Password is required.'}

        if len(data['password']) < 8:
            return {'error': True, 'message': 'Password must be at least 8 characters.'}

        if 'confirm_password' not in data:
            return {'error': True, 'message': 'Confirm password is required.'}

        if data['password'] != data['confirm_password']:
            return {'error': True, 'message': 'Passwords do not match.'}

        return {'error': False, 'message': 'User is valid.', 'user': data}

    @staticmethod
    def login_validation(data):
        if 'username' not in data or 'password' not in data:
            error_message = "Invalid email/password."
            return {'error': True, 'message': error_message}

        valid_user = User.get_username(data['username'])
        if not valid_user:
            error_message = "Invalid User."
            return {'error': True, 'message': error_message}

        if not bcrypt.check_password_hash(valid_user['password'], data['password']):
            error_message = "Incorrect password."
            return {'error': True, 'message': error_message}

        return {'error': False, 'message': "User is valid.", 'user': valid_user}
    

    @classmethod
    def get_new_user(cls, username):
        user = User.get_username(username)
        if user is None:
            return None
        return {'error': False, 'message': "New user successful", 'user': user}

        