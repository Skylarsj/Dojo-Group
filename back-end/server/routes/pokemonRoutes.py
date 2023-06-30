from flask import  redirect, request, session, jsonify
from server import app

from server.controllers.pokemonController import generate_encounter
from server.models.pokemonModel import Pokemon

@app.route('/encounter', methods=['POST'])
def encounter():
    # Extract the JSON payload from the request
    data = request.get_json()
    
    habitat = data.get('habitat')

    result = generate_encounter(habitat)

    if result['error']:
        return jsonify(result), 400  # Return error response with status code 400

    return jsonify(result), 200  # Return success response with status code 200


@app.route('/pokemon/save', methods=['POST'])
def save_captured_pokemon():
    # Extract the captured Pokemon data from the request
    data = request.get_json()

    # Get the nickname from the user separately
    nickname = data.get('nickname')
    
    # Add the nickname to the data dictionary
    data['nickname'] = nickname

    # Call the save_pokemon() function to save the captured Pokemon data to the database
    result = save_pokemon(data)

    if result['error']:
        return jsonify(result), 400  # Return error response with status code 400

    return jsonify(result), 200  # Return success response with status code 200

@app.route('/pokemon/update/nickname', methods=['POST'])
def update_pokemon_nickname_route():
    data = request.get_json()

    result = Pokemon.update(data)

    if result['error']:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route('/pokemon/delete/<int:id>', methods=['DELETE'])
def delete_pokemon_route(id):
    # Create a dictionary with the id parameter
    data = {'id': id}

    # Call the delete function of the Pokemon model to delete the Pokemon
    result = Pokemon.delete(data)

    if result['error']:
        return jsonify(result), 400  # Return error response with status code 400

    return jsonify(result), 200  # Return success response with status code 200