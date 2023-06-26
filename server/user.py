from flask_app.config.mysqlconnection import connectToMySQL



db = 'dojo_group'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class User:
  def __init__( self , db_data ):
    self.id = db_data['id']
    self.Username = db_data['Username']
    self.email = db_data['email']
    self.password = db_data['password']
    self.created_at = db_data['created_at']
    self.updated_at = db_data['updated_at']
    self.pokemon = []

  @classmethod
  def save_user(cls, form_data):
    query= 'INSERT INTO user(Username, email, password) VALUES( %(Username)s, %(email)s, %(password)s );'
    return connectToMySQL(db).query_db(query, form_data)
  
  @classmethod
  def get_all(cls):
    query = 'SELECT * FROM user;'
    results = connectToMySQL(db).query_db(query)
    users = []
    for user in results:
      users.append(cls(user))
    return users

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
      query = "SELECT * FROM user LEFT JOIN tree on user.id = tree.user_id WHERE user.id = %(id)s;"
      results = connectToMySQL(db).query_db(query,data)
      print(results)
      user = cls(results[0])
      for row in results:
          n = {
                'id': row['tree.id'],
                'user_id' : row['user_id'],
                'species': row['species'],
                'location': row['location'],
                'reason': row['reason'],
                'date_planted': row['date_planted'],
                'created_at': row['tree.created_at'],
                'updated_at': row['tree.updated_at']
            }
          user.trees.append( tree.Tree(n) )
      return user

  @staticmethod
  def validate_User(user):
    is_valid = True # we assume this is true
    query = "SELECT * FROM user WHERE email = %(email)s;"
    results = connectToMySQL(db).query_db(query,user)
    if len(results) >= 1:
      flash("Email already taken.","register")
      is_valid = False
    if len(user['first_name']) < 2:
      flash("First Name must be at least 2 characters." ,"register")
      is_valid = False
    if len(user['last_name']) < 2:
      flash("Last Name must be at least 2 characters." ,"register")
      is_valid = False
    if not EMAIL_REGEX.match(user['email']): 
      flash("Invalid email address!" ,"register")
      is_valid = False
    if len(user['password']) < 8:
      flash("Password must be at least 8 characters." ,"register")
      is_valid = False
    if (user['password']) != user['confirm_password']:
      flash("Passwords do not match." ,"register")
      is_valid = False
    return is_valid

  @staticmethod
  def validate_login(form_data):
    if not EMAIL_REGEX.match(form_data['email']):
      flash("Invalid email/password.","login")
      return False

    user = User.get_by_email(form_data)
    if not user:
      flash("Invalid email/password.","login")
      return False
        
    if not bcrypt.check_password_hash(user.password, form_data['password']):
      flash("Invalid email/password.","login")
      return False
        
    return user