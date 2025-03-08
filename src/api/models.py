from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Foreignkey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__: "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    ubication: Mapped[str] = mapped_column(nullable=False)
    photo: Mapped[str] = mapped_column (nullable=False)
    phone: Mapped[str] = mapped_column (nullable=False)



class Pet(db.Model):
    __tablename__: "pet"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    gender: Mapped[str] = mapped_column (nullable=False)
    photo: Mapped[str] = mapped_column (nullable=False)
    medical_history: Mapped[str] = mapped_column (nullable=False)
    race: Mapped[str] = mapped_column (nullable=False)
    spicie: Mapped[str] = mapped_column (nullable=False)
    emergency_phone: Mapped[str] = mapped_column (nullable=False)

# > Relartion One to Many with Pets

    id_user: Mapped[str] = mapped_column (Foreignkey("user.id_user"))
    user: Mapped["User"] = relationship()


class Company(db.Model):
    __tablename__: "company"
    id: Mapped[int] = mapped_column(primary_key=True)
    name_company: Mapped[str] = mapped_column (nullable=False)
    email: Mapped[str] = mapped_column (nullable=False)
    password: Mapped[str] = mapped_column (nullable=False)
    location: Mapped[str] = mapped_column (nullable=False)
    photo: Mapped[str] = mapped_column (nullable=False)

class Services(db.model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column (nullable=False)

# --> Relation one to many with Company

    id_company: Mapped[str] = mapped_column (Foreignkey("company.id_company"))
    user: Mapped["Company"] = relationship()

class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

# --> Relation one to many with User

    id_user: Mapped[str] = mapped_column (Foreignkey("user.id_user"))
    user: Mapped["User"] = relationship()

# --> Relation one to many with Company

    id_company: Mapped[str] = mapped_column (Foreignkey("company.id_company"))
    user: Mapped["Company"] = relationship()



class Appointments(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[str] = mapped_column (nullable=False)
    status: Mapped[str] = mapped_column (nullable=False)
    hour: Mapped[str] = mapped_column (nullable=False)
    place: Mapped[str] = mapped_column (nullable=False)






    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }