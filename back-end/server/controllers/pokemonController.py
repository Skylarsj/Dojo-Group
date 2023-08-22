from flask import session
import random, requests
from server.models.pokemonModel import Pokemon
from server.models.userModel import User

def delete_one(data):
    print("Deleting one pokemon")
    
    Pokemon.delete(data)

    return {'error': False, 'message': 'Pokemon deleted'}

def update_one(data):
    print("Updating one pokemon")
    
    Pokemon.update(data)

    return {'error': False, 'message': 'Pokemon updated'}

def validate_all(data):
    print("Validating all pokemon")
    
    pokemon = Pokemon.get_all(data)
    if not pokemon:
        return {'error': True, 'message': 'Invalid pokemon data'}
    return {'error': False, 'pokemon': pokemon}

def save_pokemon(newData):
    print("Saving Pokemon")

    new_pokemon = Pokemon.validate_pokemon(newData)
    print(new_pokemon)
    if new_pokemon is None:
        return {'error': True, 'message': new_pokemon}
    
    Pokemon.save_pokemon(newData)

    return new_pokemon

def update_pokemon_nickname(data):
    print("Updating Pokemon Nickname")
    updated_pokemon = Pokemon.validate_pokemon(data)
    if not updated_pokemon:
        return {'error': True, 'message': 'Invalid pokemon data'}
    
    Pokemon.update(data)

    return updated_pokemon

def delete_pokemon(data):
    print("Deleting Pokemon")
    deleted_pokemon = Pokemon.validate_pokemon(data)
    if not deleted_pokemon:
        return {'error': True, 'message': 'Invalid pokemon data'}
    
    Pokemon.delete(data)

    return deleted_pokemon

def get_pokemon_by_user_id(user_id):
    print("Getting Pokemon by user ID")
    pokemon_list = Pokemon.get_by_user_id(user_id)
    if not pokemon_list:
        return {'error': True, 'message': 'No Pokemon found for user'}
    
    return pokemon_list