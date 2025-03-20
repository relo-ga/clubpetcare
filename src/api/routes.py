"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company
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


@api.route('/user', methods=['POST'])
def create_user():
    request_body = request.get_json()
    user = User(name=request_body['name'], email=request_body['email'],
                password=request_body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

# GET para obtener un suario


@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200

# PUT para actualizar un usuario


@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    request_body = request.get_json()
    user.name = request_body.get("name", user.name)
    user.email = request_body.get("email", user.email)
    user.password = request_body.get("password", user.password)
    db.session.commit()

    return jsonify(user.serialize()), 200


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
