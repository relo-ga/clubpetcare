from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    location: Mapped[str] = mapped_column(nullable=True) 
    photo: Mapped[str] = mapped_column(nullable=True)
    phone: Mapped[str] = mapped_column(nullable=True)

    #constructor
    def __init__(self, name, email, password, is_active, location=None, photo=None, phone=None):
        self.name = name
        self.email = email
        self.password = password
        self.is_active = is_active
        self.location = location
        self.photo = photo
        self.phone = phone

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_active": self.is_active,
            "location": self.location,
            "photo": self.photo,
            "phone": self.phone,
            # Excluir la contraseña por seguridad
        }
    
class Company(db.Model):
    __tablename__ = "company"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    name_company: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    location: Mapped[str] = mapped_column(nullable=False)
    photo: Mapped[str] = mapped_column(nullable=False)

    #constructor
    def __init__(self, name, name_company, email, password, location, photo):
        self.name = name
        self.name_company = name_company
        self.email = email
        self.password = password
        self.location = location
        self.photo = photo

    def serialize(self):
        return {
            "id": self.id,
            "name_company": self.name_company,
            "email": self.email,
            "location": self.location,
            "photo": self.photo,
            # Excluir la contraseña por seguridad
        }   

class Pet(db.Model):
    __tablename__ = "pet"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    gender: Mapped[str] = mapped_column(nullable=False)
    photo: Mapped[str] = mapped_column(nullable=False)
    medical_history: Mapped[str] = mapped_column(nullable=False)
    race: Mapped[str] = mapped_column(nullable=False)
    specie: Mapped[str] = mapped_column(nullable=False)
    emergency_phone: Mapped[str] = mapped_column(nullable=False)

# > Relation One to Many with Pets

    id_user: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship()

    #constructor
    def __init__(self, name,gender,photo,medical_history,race,specie,emergency_phone,user):
        self.name = name
        self.gender = gender
        self.photo = photo
        self.medical_history = medical_history
        self.race = race
        self.specie = specie
        self.emergency_phone = emergency_phone
        self.user = user


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "photo": self.photo,
            "medical_history": self.medical_history,
            "race": self.race,
            "specie": self.specie,
            "emergency_phone": self.emergency_phone,
            "id_user": self.id_user,
        }

class Services(db.Model):
    __tablename__ = "services"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)

# --> Relation one to many with Company

    id_company: Mapped[int] = mapped_column(ForeignKey("company.id"))
    company: Mapped["Company"] = relationship()

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "id_company": self.id_company,
        }

class Favorites(db.Model):
    __tablename__ = "favorites"
    id: Mapped[int] = mapped_column(primary_key=True)

# --> Relation one to many with User

    id_user: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship()

# --> Relation one to many with Company

    id_company: Mapped[int] = mapped_column(ForeignKey("company.id"))
    company: Mapped["Company"] = relationship()

    #constructor
    def __init__(self, id_user, id_company):
        self.id_user = id_user
        self.id_company = id_company

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_company": self.id_company,
        }

class Appointments(db.Model):
    __tablename__ = "appointments"
    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)
    time: Mapped[str] = mapped_column(nullable=False)
    location: Mapped[str] = mapped_column(nullable=False)

# --> Relation Many to many with Pet
    id_pet: Mapped[int] = mapped_column(ForeignKey("pet.id"))
    pet: Mapped["Pet"] = relationship()

# --> Relation One to many
    id_service: Mapped[int] = mapped_column(ForeignKey("services.id"))
    service: Mapped["Services"] = relationship()


    #constructor
    def __init__(self, date, status, time, location, id_pet, id_service):
        self.date = date
        self.status = status
        self.time = time
        self.location = location
        self.id_pet = id_pet
        self.id_service = id_service

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "status": self.status,
            "time": self.time,
            "location": self.location,
            "id_pet": self.id_pet,
            "id_service": self.id_service,
        }
    

