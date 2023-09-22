from flask import  redirect, request, session, jsonify
from server import app
from flask_cors import CORS

from server.models.userModel import User


CORS(app)

@app.route('/api/pokeballs/use', methods=['POST'])
def use_pokeball_route():
    user_id = request.json.get('user_id')
    pokeball_type = request.json.get('pokeball_type')

    if not user_id:
        return jsonify({'error': True, 'message': 'User not logged in.'}), 400

    user_instance = User.get_by_id(user_id)

    if not user_instance:
        return jsonify({'error': True, 'message': 'User not found.'}), 404

    # Check if the user has enough of the specified Pokeball type
    pokeball_columns = {
        'normal': 'normal_pokeballs',
        'great': 'great_pokeballs',
        'ultra': 'ultra_pokeballs',
        'master': 'master_pokeballs',
    }

    if pokeball_type not in pokeball_columns:
        return jsonify({'error': True, 'message': 'Invalid Pokeball type.'}), 400

    pokeball_column = pokeball_columns[pokeball_type]

    if getattr(user_instance, pokeball_column, 0) <= 0:
        return jsonify({'error': True, 'message': f'No {pokeball_type.capitalize()} Pokeballs remaining.'}), 400

    # If the user has enough Pokeballs, update the count
    return User.update_pokeballs(user_id, pokeball_type)

    
@app.route('/api/users/<int:user_id>/pokeballs', methods=['GET'])
def get_pokeballs(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    pokeballs = user.get_all_pokeballs({'id': user_id})
    return jsonify(pokeballs), 200


@app.route('/api/pokeballs/add', methods=['POST'])
def add_pokeballs_route():
    print("Adding Pokeballs")
    data = request.get_json()
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID not provided'}), 400
    user_instance = User.get_by_id(user_id)
    if not user_instance:
        return jsonify({'error': 'User not found'}), 404
    User.add_pokeballs({'id': user_instance.id, 'normal_pokeballs': data['normal_pokeballs'], 'great_pokeballs': data['great_pokeballs'], 'ultra_pokeballs': data['ultra_pokeballs'], 'master_pokeballs': data['master_pokeballs']})
    return jsonify({'message': 'Pokeballs added successfully'}), 200
    

