import React, { useState } from "react";
import { Calendar } from "../components/Calendar";

const CardServicesProf = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [pets, setPets] = useState([]);
    const [loadingPets, setLoadingPets] = useState(false);

    const handleReservarClick = async () => {
        try {
            setLoadingPets(true);
            // Obtener las mascotas del usuario
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pets`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error('Error al cargar mascotas');
            const petsData = await response.json();
            setPets(petsData);
            
            setShowModal(true);
        } catch (error) {
            console.error("Error al cargar mascotas:", error);
            alert("Error al cargar tus mascotas. Por favor intenta nuevamente.");
        } finally {
            setLoadingPets(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleReservar = (reservaData) => {
        console.log("Datos de reserva:", {
            ...reservaData,
            serviceId: props.id // Añadimos el ID del servicio desde las props
        });
        alert("Reserva realizada con éxito");
        setShowModal(false);
        
        // Aquí puedes hacer el fetch para guardar la reserva
        // guardarReserva(reservaData);
    };

    return (
        <div className="col-lg-3 mt-5 me-3">
            {/* Modal para reservar - Pasamos el companyId desde las props */}
            <Calendar 
                show={showModal} 
                onClose={handleCloseModal} 
                onConfirm={handleReservar} 
                pets={pets}
                companyId={props.id_company}
                serviceId={props.id}
            />
            
            <div className="card h-100">
                <div className="p-3 d-flex justify-content-center mx-auto" style={{ width: "100px" }}>
                    <img 
                        src={props.image} 
                        className="card-img-top img-fluid rounded" 
                        alt={props.name}
                        style={{ height: "100px", objectFit: 'cover' }}
                    />
                </div>
                <div className="card-body p-4">
                    <h5 className="card-title mb-3 text-center">{props.name}</h5>
                    <div className="text-wrap mb-3 text-center">
                        <p className="text-muted">{props.description}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button 
                            type="button" 
                            className="btn btn-outline-danger"
                            onClick={handleReservarClick}
                            disabled={loadingPets}
                        >
                            {loadingPets ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Cargando...</span>
                                </>
                            ) : "Reservar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardServicesProf;