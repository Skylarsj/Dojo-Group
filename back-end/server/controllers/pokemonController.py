from flask import session
import random, requests
from server.models.pokemonModel import Pokemon
from server.models.userModel import User

def save_pokemon(newData):
    print("Saving Pokemon")

    new_pokemon = Pokemon.save_pokemon(newData)

    if new_pokemon.get('error'):
        return {'error': True, 'message': 'Invalid pokemon data'}

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




# def all_pokemon():
#     # make a function that will return a json error if the user is not logged in
#     if 'user_id' not in session:
#         return {'error': True, 'message': 'You must be logged in to view this page'}, False
#     user = User.get_id({'id': session['user_id']})
#     if not user:
#         return {'error': True, 'message': 'Failed to get user'}, False
#     pokemon = Pokemon.get_all()
#     if not pokemon:
#         return {'error': True, 'message': 'Failed to get pokemon'}, False
#     return {'error': False, user: user, pokemon: Pokemon.get_all()}

# def get_pokemon_info(pokemon_name):
#     url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         return response.json()
#     else:
#         return None

# def get_catch_rate(pokemon_info):
#     if pokemon_info:
#         catch_rate = pokemon_info['species']['capture_rate']
#         return int(catch_rate)
#     else:
#         return None
    
# def get_pokeball_capture_modifier(pokeball_type):
#     pokeball_modifiers = {
#         "pokeball": 1.0,    # Default modifier
#         "greatball": 1.5,   # Modifier for Great Ball
#         "ultraball": 2.0,   # Modifier for Ultra Ball
#         "masterball": 255.0 # Modifier for Master Ball
#     }

#     return pokeball_modifiers.get(pokeball_type.lower(), None)

# def capture_pokemon(pokemon_name, pokeball_type):
#     pokemon_info = get_pokemon_info(pokemon_name)
#     catch_rate = get_catch_rate(pokemon_info)
#     capture_modifier = get_pokeball_capture_modifier(pokeball_type)

#     if catch_rate is None or capture_modifier is None:
#         print(f"Failed to retrieve information for {pokemon_name} or {pokeball_type}.")
#         return

#     modified_catch_rate = catch_rate * capture_modifier
#     random_number = random.randint(1, 100)

#     if random_number <= modified_catch_rate:
#         print(f"{pokemon_name} captured successfully using {pokeball_type}!")
#     else:
#         print(f"{pokemon_name} escaped. Try again!")

# def generate_encounter(habitat):
#     # Define a list of valid habitats
#     valid_habitats = ['cave', 'forest', 'grassland', 'mountain', 'rare', 'rough-terrain', 'sea', 'urban', 'waters-edge']

#     # Retrieve the list of Pokémon that can be found in the specified habitat
#     url = f"https://pokeapi.co/api/v2/pokemon-habitat/{habitat}"
#     response = requests.get(url)
#     if response.status_code != 200:
#         return {'error': True, 'message': f'Failed to retrieve Pokémon data for {habitat}'}

#     data = response.json()
#     pokemon_list = data['pokemon_species']

#     # Check if the habitat contains any Pokémon
#     if not pokemon_list:
#         return {'error': True, 'message': f'No Pokémon found for {habitat}'}

#     # Select a random Pokémon from the list
#     pokemon_name = random.choice(pokemon_list)['name']
    
#     # Retrieve information about the selected Pokémon
#     pokemon_info = get_pokemon_info(pokemon_name)

#     # Return the result
#     return {'error': False, 'pokemon': pokemon_info}