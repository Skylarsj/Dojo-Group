from flask import  redirect, request, session, jsonify
from server import app
from flask_cors import CORS

from server.models.userModel import User


CORS(app)

@app.route('/api/pokeballs/use', methods=['POST'])
def use_pokeball_route():
    data = request.get_json()
    user = User.get_pokeballs({'id': data['user_id']})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    pokeball_type = data['pokeball_type']
    if pokeball_type == 'pokeball':
        result = User.use_normal_pokeball()
    elif pokeball_type == 'greatball':
        result = User.use_great_pokeball()
    elif pokeball_type == 'ultraball':
        result = User.use_ultra_pokeball()
    elif pokeball_type == 'masterball':
        result = User.use_master_pokeball()
    else:
        return jsonify({'error': 'Invalid Pokeball type'}), 400
    if result:
        User.update_pokeballs({'id': user.id, 'normal_pokeballs': user.normal_pokeballs, 'great_pokeballs': user.great_pokeballs, 'ultra_pokeballs': user.ultra_pokeballs, 'master_pokeballs': user.master_pokeballs})
        return jsonify({'message': 'Pokeball used successfully'}), 200
    else:
        return jsonify({'error': 'No Pokeballs of the specified type remaining'}), 400
    
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
    user = User.get_pokeballs({'id': data['user_id']})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    User.add_pokeballs({'id': user.id, 'normal_pokeballs': data['normal_pokeballs'], 'great_pokeballs': data['great_pokeballs'], 'ultra_pokeballs': data['ultra_pokeballs'], 'master_pokeballs': data['master_pokeballs']})
    return jsonify({'message': 'Pokeballs added successfully'}), 200
    

