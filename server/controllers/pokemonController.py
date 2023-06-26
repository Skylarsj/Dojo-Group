from flask import request, session
from server.models.pokemonModel import Pokemon
from server.models.userModel import User

def all_pokemon():
  # make a function that will return a json error if the user is not logged in
  if 'user_id' not in session:
    return {'error': True, 'message': 'You must be logged in to view this page'}, False
  user = User.get_id({'id': session['user_id']})
  if not user:
    return {'error': True, 'message': 'Failed to get user'}, False
  pokemon = Pokemon.get_all()
  if not pokemon:
    return {'error': True, 'message': 'Failed to get pokemon'}, False
  return {'error': False, user: user, pokemon: Pokemon.get_all()}

#