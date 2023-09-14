from server.config.mysqlconnection import connectToMySQL
from flask_bcrypt import Bcrypt
from flask import jsonify
import re

bcrypt = Bcrypt()

db = 'Pokemon'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

class User:
    def __init__(self, db_data):
        self.id = db_data['id']
        self.username = db_data['username']
        self.email = db_data['email']
        self.password = db_data['password']
        self.normal_pokeballs = db_data['normal_pokeballs']
        self.great_pokeballs = db_data['great_pokeballs']
        self.ultra_pokeballs = db_data['ultra_pokeballs']
        self.master_pokeballs = db_data['master_pokeballs']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']
        self.pokemon = []

    @classmethod
    def save_user(cls, form_data):
        form_data['normal_pokeballs'] = 10
        form_data['great_pokeballs'] = 0
        form_data['ultra_pokeballs'] = 0
        form_data['master_pokeballs'] = 0
        query= 'INSERT INTO user(username, email, password, normal_pokeballs, great_pokeballs, ultra_pokeballs, master_pokeballs) VALUES( %(username)s, %(email)s, %(password)s, %(normal_pokeballs)s, %(great_pokeballs)s, %(ultra_pokeballs)s, %(master_pokeballs)s );'
        return connectToMySQL(db).query_db(query, form_data)
        67

    @classmethod
    def get_all(cls):
        query = 'SELECT * FROM user;'
        results = connectToMySQL(db).query_db(query)
        users = []
        for result in results:
            users.append(cls(result))
        return users


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
                'created_at': row['created_at'],
                'updated_at': row['updated_at']
                }
            user.pokemon.append( pokemonModel.Pokemon(n) )
        return user
    
    @classmethod
    def use_normal_pokeball(self):
        if self.normal_pokeballs > 0:
            self.normal_pokeballs -= 1
            return True
        else:
            return False
    
    @classmethod
    def use_great_pokeball(self):
        """Use a great pokeball."""
        if self.great_pokeballs > 0:
            self.great_pokeballs -= 1
            return True
        return False
    
    @classmethod
    def use_ultra_pokeball(self):
        """Use an ultra pokeball."""
        if self.ultra_pokeballs > 0:
            self.ultra_pokeballs -= 1
            return True
        return False
    
    @classmethod
    def use_master_pokeball(self):
        """Use a master pokeball."""
        if self.master_pokeballs > 0:
            self.master_pokeballs -= 1
            return True
        return False
    
    @classmethod
    def get_all_pokeballs(cls, data):
        query = "SELECT normal_pokeballs, great_pokeballs, ultra_pokeballs, master_pokeballs FROM user WHERE id = %(id)s;"
        results = connectToMySQL(db).query_db(query, data)
        if results:
            return results[0]
        else:
            return None
        
    
    @classmethod
    def get_pokeballs(cls, filters):
        query = "SELECT normal_pokeballs, great_pokeballs, ultra_pokeballs, master_pokeballs FROM user WHERE "
        conditions = []
        for key, value in filters.items():
            conditions.append(f"{key} = '{value}'")
        query += " AND ".join(conditions) + ";"
        results = connectToMySQL(db).query_db(query)
        if results:
            return results[0]
        else:
            return None
    
    @classmethod
    def update_pokeballs(cls, data):
        query = "UPDATE user SET normal_pokeballs = %(normal_pokeballs)s, great_pokeballs = %(great_pokeballs)s, ultra_pokeballs = %(ultra_pokeballs)s, master_pokeballs = %(master_pokeballs)s WHERE id = %(id)s;"

    @classmethod
    def add_pokeballs(cls, data):
        query = "UPDATE user SET normal_pokeballs = normal_pokeballs + %(normal_pokeballs)s, great_pokeballs = great_pokeballs + %(great_pokeballs)s, ultra_pokeballs = ultra_pokeballs + %(ultra_pokeballs)s, master_pokeballs = master_pokeballs + %(master_pokeballs)s WHERE id = %(id)s;"
        connectToMySQL(db).query_db(query, data)
        

    @staticmethod
    def validate_user(data):
        print("Validating user...")
        print(data)

        if 'username' not in data:
            return {'error': True, 'message': 'Username is required.'}

        if len(data['username']) < 3:
            return {'error': True, 'message': 'Username must be at least 3 characters.'}
        
        if len(data['username']) > 16:
            return {'error': True, 'message': 'Username must be less than 16 characters.'}

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
        
        if not re.search(r"[a-z]", data['password']):
            return {'error': True, 'message': 'Password must contain at least 1 lowercase letter.'}
            
        if not re.search(r"[A-Z]", data['password']):
            return {'error': True, 'message': 'Password must contain at least 1 uppercase letter.'}
                
        if not re.search(r"[0-9]", data['password']):
            return {'error': True, 'message': 'Password must contain at least 1 number.'}
                
        if not re.search(r"[!@#$%^&*]", data['password']):
            return {'error': True, 'message': 'Password must contain at least 1 special character.'}

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

        