import pymysql.cursors
import pymysql
import os
from cryptography import x509
from cryptography.hazmat.backends import default_backend

class MySQLConnection:
    def __init__(self, db):
        connection = pymysql.connect(
        host='localhost',
        user='root', 
        password= os.environ.get('DB_PASSWORD'), 
        db=db,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
        )
        self.connection = connection

def query_db(self, query, data=None):
    with self.connection.cursor() as cursor:
        try:
            query = cursor.mogrify(query, data)
            print("Running Query:", query)

            cursor.execute(query, data)
            if query.lower().find("insert") >= 0:
                self.connection.commit()
            elif query.lower().find("select") >= 0:
                result = cursor.fetchall()
                return result
            else:
                self.connection.commit()
        except Exception as e:
            print("Something went wrong", e)
            return False
        finally:
            self.connection.close()

def connectToMySQL(db):
    return MySQLConnection(db)