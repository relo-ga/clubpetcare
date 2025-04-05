from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company, Services, Pet, Appointments
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def password_match(user, password):
    return user.password == password


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    company = Company.query.filter_by(email=email).first()

    if not user and not company:
        return jsonify({"msg": "Invalid email or password"}), 401

    if user and not password_match(user, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    if company and not password_match(company, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    from datetime import timedelta
    access_token = create_access_token(
        identity=email, expires_delta=timedelta(hours=24))

    role = "user" if user else "company"
    profile = user if user else company

    return jsonify(access_token=access_token, profile=profile.serialize(), role=role), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def me():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    company = Company.query.filter_by(email=current_user).first()
    if user:
        role = "user"
        profile = user
        return jsonify(profile=profile.serialize(), role=role), 200
    if company:
        role = "company"
        profile = company
        return jsonify(profile=profile.serialize(),role=role), 200
    
    return jsonify({"msg": "User not found"}), 404


@api.route("/loginCompany", methods=["POST"])
def loginCompany():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = Company.query.filter_by(email=email).first()

    if not user or not password_match(user, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Se crea la ruta para crear un usuario en la base de datos y se retorna el usuario creado en formato JSON


@api.route('/user', methods=['POST'])
def create_user_diego():
    request_body = request.get_json()
    user = User(name=request_body['name'], email=request_body['email'],
                password=request_body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

# TODO: No se esta utilizando en el proyecto por el momento
# Se puede utilizar para crear un usuario desde el frontend


@api.route('/createuser', methods=['POST'])
def create_user_david():
    request_body = request.get_json()
    new_user = User(name=request_body['name'], email=request_body['email'],
                    password=request_body['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 200

# GET para obtener un Usuario
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
@api.route('/company', methods=['POST'])
def create_company():
    request_body = request.get_json()
    new_company = Company(name=request_body['name'], name_company=request_body['name_company'], email=request_body['email'], password=request_body['password'])
    db.session.add(new_company)
    db.session.commit()
    email = request_body['email']
    access_token = create_access_token(identity=email)
    return jsonify(company=new_company.serialize(), access_token=access_token), 200


# Post para crear una reserva
@api.route('/appointments', methods=['POST'])
def create_reserve():
    request_body = request.get_json()
    reserve = Services(
        name=request_body['name'], id_company=request_body['id_company'], is_active=True)
    db.session.add(reserve)
    db.session.commit()
    return jsonify(reserve.serialize()), 200


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


@api.route('/company/<int:id>', methods=['GET'])
def get_company_by_id(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"error": "Company not found"}), 404
    return jsonify(company.serialize()), 200



# Post para crear pets
@api.route('/createpet', methods=['POST'])
@jwt_required()
def create_pet():
    request_body = request.get_json()

    owner_email = get_jwt_identity()

    owner = User.query.filter_by(email=owner_email).first()

    if not owner:
        return "User not found", 404

    user_id = owner.id

    if not user_id:
        return "No has indicado un user id!", 400
    owner = User.query.get(user_id)
    if not owner:
        return "User not found", 404
    new_pet = Pet(name=request_body['name'], gender=request_body['gender'], photo=request_body["photo"], medical_history=request_body["medical_history"],
                  race=request_body["race"], specie=request_body["specie"], emergency_phone=request_body["emergency_phone"], user=owner)
    db.session.add(new_pet)
    db.session.commit()
    return jsonify(new_pet.serialize()), 200

# Get para obtener pets


@api.route('/pets', methods=['GET'])
@jwt_required()
def get_pets():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    print("Received a get request to /pets")
    pets = Pet.query.filter_by(id_user=user.id).all()
    print("Pets found:", pets)  # Log de los usuarios encontrados
    pets = list(map(lambda x: x.serialize(), pets))
    return jsonify(pets), 200

# Get para obtener pets por id


@api.route('/pet/<int:id>', methods=['GET'])
@jwt_required()
def get_pet_by_id(id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    pet = Pet.query.filter_by(id=id, id_user=user.id).first()
    if not pet:
        return jsonify({"error": "Pet not found"}), 404
    return jsonify(pet.serialize()), 200

# Put para actualizar pets
@api.route('/pet/<int:id>', methods=['PUT'])
@jwt_required()
def pet_update(id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    pet = Pet.query.filter_by(id=id, id_user=user.id).first()
    if not pet:
        return jsonify({"error": "Pet not found"}), 404
    request_body = request.get_json()
    pet.photo = request_body.get("photo", pet.photo)
    pet.emergency_phone = request_body.get("emergency_phone", pet.emergency_phone)
    pet.medical_history = request_body.get("medical_history", pet.medical_history)

    db.session.commit()

    return jsonify(pet.serialize()), 200


#
# SERVICIOS
#
# Ruta para POST de servicios


@api.route('/services', methods=['POST'])
def create_services():
    request_body = request.get_json()
    services = Services(name=request_body['name'], description=request_body['description'],
                        image=request_body['image'], id_company=request_body['id_company'], is_active=True)
    db.session.add(services)
    db.session.commit()
    return jsonify(services.serialize()), 200

# Ruta para GET de servicios por compañia


@api.route('/services', methods=['GET'])
@jwt_required()
def get_services_id():
    current_company = get_jwt_identity()
    company = Company.query.filter_by(email=current_company).first()
    services = Services.query.filter_by(id_company=company.id).all()
    print("Services found:", services)
    services = list(map(lambda x: x.serialize(), services))
    return jsonify(services), 200

# Ruta para GET de servicios por id
@api.route('/services/<int:id>', methods=['GET'])
@jwt_required()
def get_services_id2(id):
    current_company = get_jwt_identity()
    company = Company.query.filter_by(email=current_company).first()
    services = Services.query.filter_by(id=id, id_company=company.id).first()
    if not services:
        return jsonify({"error": "Service not found"}), 404
    return jsonify(services.serialize()), 200




@api.route('/company/<int:company_id>/services', methods=['GET'])
def get_company_services(company_id):
    # Asegúrate de devolver JSON incluso en errores
    try:
        company = Company.query.get_or_404(company_id)
        services = Services.query.filter_by(id_company=company_id).all()
        return jsonify([s.serialize() for s in services])
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # ¡Importante! Siempre jsonify
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# Ryta para PUT para modificar informacion del usuario en la API

@api.route('/user_profile/<int:id>', methods=['PUT'])
@jwt_required()
def user_update2(id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    request_body = request.get_json()
    print(request_body)
    user.location = request_body.get("location", user.location)
    user.photo = request_body.get("photo", user.photo)
    user.phone = request_body.get("phone", user.phone)
    user.secondary_phone = request_body.get("secondary_phone", user.secondary_phone)
    user.age = request_body.get("age", user.age)

    db.session.commit()

    return jsonify(user.serialize()), 200

# Put para modificar la informacion de la Company

@api.route('/company_profile/<int:id>', methods=['PUT'])
@jwt_required()
def company_update2(id):
    current_user = get_jwt_identity()
    company = Company.query.filter_by(email=current_user).first()
    if not company:
        return jsonify({"error": "Company not found"}), 404

    request_body = request.get_json()
    print(request_body)
    company.location = request_body.get("location", company.location)
    company.photo = request_body.get("photo", company.photo)
    company.phone = request_body.get("phone", company.phone)
    company.description = request_body.get("description", company.description)

    db.session.commit()

    return jsonify(company.serialize()), 200

# post para crear una reserva de potato
@api.route('/appointmentPotato', methods=['POST'])
def create_appointment():
    request_body = request.get_json()
    required_fields = ['date', 'status', 'time', 'location',
                       'details', 'duration', 'id_pet', 'id_service']
    for field in required_fields:
        if field not in request_body:
            return {"error": f"Field {field} is required"}, 400

    new_appointment = Appointments(
        date=request_body['date'],
        status=request_body['status'],
        time=request_body['time'],
        location=request_body['location'],
        details=request_body['details'],
        duration=request_body['duration'], 
        id_pet=request_body['id_pet'],
        id_service=request_body['id_service'],
    )
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify(new_appointment.serialize()), 200

# get para obtener las reservas de potato
@api.route('/appointmentspotato', methods=['GET'])
def get_appointments():
    print("Received a GET request to /appointments")  # Mensaje de log
    appointments = Appointments.query.all()
    print("Appointments found:", appointments)  # Log de los usuarios encontrados
    appointments = list(map(lambda x: x.serialize(), appointments))
    return jsonify(appointments), 200

@api.route('/company/appointments', methods=['GET'])
@jwt_required()
def get_company_appointments():
    # Obtener el email de la compañía del token JWT
    company_email = get_jwt_identity()
    # Buscar la compañía en la base de datos
    company = Company.query.filter_by(email=company_email).first()
    if not company:
        return jsonify({"error": "Company not found"}), 404
    # Obtener todos los servicios de la compañía
    services = Services.query.filter_by(id_company=company.id).all()
    service_ids = [service.id for service in services]
    # Obtener las citas para estos servicios
    appointments = Appointments.query.filter(
        Appointments.id_service.in_(service_ids)
    ).all()
    # Serializar los resultados
    result = [appointment.serialize() for appointment in appointments]
    print(f"Found {len(result)} appointments for company {company.id}")
    return jsonify(result), 200