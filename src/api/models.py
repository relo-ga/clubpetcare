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
    location: Mapped[str] = mapped_column(nullable=False)
    photo: Mapped[str] = mapped_column (nullable=False)
    phone: Mapped[str] = mapped_column (nullable=False)

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

class Pet(db.Model):
    __tablename__ = "pet"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    gender: Mapped[str] = mapped_column (nullable=False)
    photo: Mapped[str] = mapped_column (nullable=False)
    medical_history: Mapped[str] = mapped_column (nullable=False)
    race: Mapped[str] = mapped_column (nullable=False)
    specie: Mapped[str] = mapped_column (nullable=False)
    emergency_phone: Mapped[str] = mapped_column (nullable=False)

# > Relation One to Many with Pets

    id_user: Mapped[int] = mapped_column (ForeignKey("user.id"))
    user: Mapped["User"] = relationship()


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

class Company(db.Model):
    __tablename__ = "company"
    id: Mapped[int] = mapped_column(primary_key=True)
    name_company: Mapped[str] = mapped_column (nullable=False)
    email: Mapped[str] = mapped_column (nullable=False)
    password: Mapped[str] = mapped_column (nullable=False)
    location: Mapped[str] = mapped_column (nullable=False)
    photo: Mapped[str] = mapped_column (nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name_company": self.name_company,
            "email": self.email,
            "location": self.location,
            "photo": self.photo,
            # Excluir la contraseña por seguridad
        }

class Services(db.Model):
    __tablename__ = "services"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column (nullable=False)

# --> Relation one to many with Company

    id_company: Mapped[int] = mapped_column (ForeignKey("company.id"))
    user: Mapped["Company"] = relationship()


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

    id_user: Mapped[str] = mapped_column (ForeignKey("user.id"))
    user: Mapped["User"] = relationship()

# --> Relation one to many with Company

    id_company: Mapped[str] = mapped_column (ForeignKey("company.id"))
    user: Mapped["Company"] = relationship()


def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_company": self.id_company,
        }


class Appointments(db.Model):
    __tablename__ = "appointments"
    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[str] = mapped_column (nullable=False)
    status: Mapped[str] = mapped_column (nullable=False)
    time: Mapped[str] = mapped_column (nullable=False)
    location: Mapped[str] = mapped_column (nullable=False)

# --> Relation Many to many with Pet
    id_pet: Mapped[str] = mapped_column(ForeignKey("pet.id"))
    pet: Mapped["Pet"] = relationship()


# --> Relation One to many
    id_service: Mapped[str] = mapped_column(ForeignKey("service.id"))
    service: Mapped["Services"] = relationship()


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