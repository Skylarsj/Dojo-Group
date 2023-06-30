from flask import  redirect, request, session, jsonify
from server import app

from server.controllers.pokemonController import save_pokemon, validate_all, delete_one, update_one
from server.models.pokemonModel import Pokemon

@app.route('/index')
def pokemonindex():
    username = session.get('username')
    print(username)
    print("hello world")
    return jsonify({"message": "Hello World POKEMON"})

@app.route('/api/pokemon/save', methods=['POST'])
def save_captured_pokemon():
    # Extract the captured Pokemon data from the request
    print("Saving Pokemon")
    data = request.get_json()
    newData = {
        'user_id': data['user_id'],
        'name': data['name'],
        'nickname': data['nickname'],
        'spriteURL': data['spriteURL'],
    }
    result = save_pokemon(newData)
    print("THIS IS THE THING YOU ARE LOOKING FOR",result)
    if result['error']:
        return jsonify(result), 400  # Return error response with status code 400

    return jsonify(result), 200  # Return success response with status code 200

@app.route('/api/pokemon/update/nickname', methods=['POST'])
def update_pokemon_nickname_route():
    data = request.get_json()
    newData = {'nickname': data['nickname'], 'id': data['id']}
    result = update_one(newData)

    if result['error']:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route('/api/pokemon/get-all/<int:id>', methods=['get'])
def get_all_pokemon_route(id):
    print("Getting all pokemon")
    data = {'id': id}
    result = validate_all(data)

    if result['error']:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route('/api/pokemon/delete/<int:id>', methods=['DELETE'])
def delete_pokemon_route(id):
    # Create a dictionary with the id parameter
    data = {'id': id}

    # Call the delete function of the Pokemon model to delete the Pokemon
    result = delete_one(data)

    if result['error']:
        return jsonify(result), 400  # Return error response with status code 400

    return jsonify(result), 200  # Return success response with status code 200