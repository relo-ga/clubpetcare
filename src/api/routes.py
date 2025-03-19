"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company, Pet
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Se crea la ruta para crear un usuario en la base de datos y se retorna el usuario creado en formato JSON 
@api.route('/createuser', methods=['POST'])
def create_user():
    request_body = request.get_json()
    new_user = User(name=request_body['name'], email=request_body['email'], password=request_body['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 200

# Post para crear una empresa
@api.route('/createcompany', methods=['POST'])
def create_company():
    request_body = request.get_json()
    new_company = Company(name=request_body['name'], name_company=request_body['name_company'], email=request_body['email'], password=request_body['password'],
                          location=request_body['location'], photo=request_body['photo'])
    db.session.add(new_company)
    db.session.commit()
    return jsonify(new_company.serialize()), 200






# Se crea la ruta para obtener todos los usuarios de la base de datos y se retorna en formato JSON
@api.route('/users', methods=['GET'])
def get_users():
    print("Received a GET request to /users")  # Mensaje de log
    users = User.query.all()
    print("Users found:", users)  # Log de los usuarios encontrados
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200

@api.route('/company', methods=['GET'])
def get_company():
    print("Received a GET request to /company")  # Mensaje de log
    company = Company.query.all()
    print("Users found:", company)  # Log de los usuarios encontrados
    company = list(map(lambda x: x.serialize(), company))
    return jsonify(company), 200






#Post para crear pets

@api.route('/createpet', methods=['POST'])
def create_pet():
    request_body = request.get_json()
    user_id = request_body.get("user_id")
    if not user_id:
        return "No has indicado un user id!", 400
    owner = User.query.get(user_id) 
    if not owner:
        return "User not found", 404
    new_pet = Pet(name=request_body['name'], gender=request_body['gender'], photo=request_body["photo"], medical_history=request_body["medical_history"]
              ,race=request_body["race"], specie=request_body["specie"], emergency_phone=request_body["emergency_phone"], user=owner)
    db.session.add(new_pet)
    db.session.commit()
    return jsonify(new_pet.serialize()), 200

# Get para obtener pets
@api.route('/pets',methods=['GET'])
def get_pets():
    print("Received a get request to /pets")
    pets = Pet.query.all()
    print("Pets found:", pets)  # Log de los usuarios encontrados
    pets = list(map(lambda x: x.serialize(), pets))
    return jsonify(pets), 200

# Get para obtener pets por id
@api.route('/pet/<int:id>',methods=['GET'])
def get_pet_by_id(id):
    print("Received a get request to /pets")
    pet = Pet.query.get(id)
    print("Pet found:", pet)  # Log de los usuarios encontrados
    
    return jsonify(pet.serialize()), 200