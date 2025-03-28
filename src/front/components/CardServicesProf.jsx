import React,{useState} from "react";
import {Calendar} from "../components/Calendar"; // Importa el componente Calendar

const CardServicesProf = (props) =>{

    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    // Función para abrir el modal
    const handleReservarClick = () => {
        setShowModal(true);
    };
    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Función para manejar la reserva
    const handleReservar = () => {
        alert("Reserva realizada con éxito");
        setShowModal(false);
    };

    return (
        <div className="col-lg-3 mt-5 me-3">
          {/* Modal para reservar */}
          <Calendar show={showModal} onClose={handleCloseModal} onConfirm={handleReservar} />
          <div className="card">
            <div className="p-3 d-flex justify-content-center mx-auto" style={{ width: "100px" }}>
              <img src={props.image} className="card-img-top" alt="..." />
            </div>
            <div className="card-body p-4">
              <h5 className="card-title mb-3 text-center">{props.name}</h5>
              <div className="text-wrap mb-3 text-center">
                <p>{props.description}</p>
              </div>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-danger" onClick={handleReservarClick}>
                  Reservar
                </button>
              </div>
            </div>
          </div>
          </div>
  
          );
}

export default CardServicesProf;