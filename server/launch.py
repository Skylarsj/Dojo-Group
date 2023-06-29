import os
from flask import Flask
from server import app
from server.routes import userRoutes
from mysqlconnection import MySQLConnection

mysql = MySQLConnection('pokemon')

if __name__ == "__main__":
  app.run(debug=True)

print(os.getcwd())