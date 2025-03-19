
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState } from "react";
import {Calendar} from "../components/Calendar"; // Importa el componente Calendar

const Veterinarios = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    const { store } = useGlobalReducer();

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

  const CardVeterinarios = (props) => {
    return (
      <div className="col-3 mt-5 me-3">
        <div className="card">
          <div className="p-3 d-flex justify-content-center mx-auto" style={{ width: "100px" }}>
            <img src={props.image} className="card-img-top" alt="..." />
          </div>
          <div className="card-body p-4">
            <h5 className="card-title mb-3 text-center">{props.title}</h5>
            <div className="text-wrap mb-3 text-center">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia porro, amet eligendi saepe laborum sit
                officiis pariatur necessitatibus esse, quisquam ut nihil numquam aut repellendus odio animi veniam
                voluptates placeat.
              </p>
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

    return(
        <div className="py-4" style={{ backgroundColor: "#FFDDD2" }}>
            <div className="mb-3 col-8 mx-auto border-bottom rounded-4" style={{ backgroundColor: "#fff" }}>
                <div className="row g-0 m-5 pt-4">
                    <div className="col-md-6 p-3 d-flex align-items-center">
                        <div>
                            <img src="https://www.clinicaveterinariapanchocavero.com/assets/img/logo.png" className="img-fluid rounded-start" alt="..."/>
                        </div>
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="card-body">
                            <h5 className="card-title">Clínica Veterinaria Pancho Cavero</h5><br/>
                            <p className="card-text">La Clínica Veterinaria Pancho Cavero inició sus actividades el 01 de Octubre del 2004. 
                                Sus fundadores, el Dr. Pancho Cavero y la Dra. Fiorella Cochella, decidieron ofrecer una propuesta médica innovadora, 
                                integral y de calidad.<br/>Quieres saber más? ingresa aquí</p>
                            <p className="card-text">Av. San Luis 2845, San Borja</p>
                            <p> 992 125 188 | 01 635 2172 <br/> Atención: Lunes a Sabado - 8 a.m. - 10 p.m. <br/>Domingos - 8 a.m. - 8 p.m.</p>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="mb-3 col-8 mx-auto border-bottom rounded-4" style={{ backgroundColor: "#fff" }}>
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Descripción</h2>
                </div>
                <div className="row g-0 m-5">
                    <div className="col-md-6 p-3 d-flex align-items-center">
                        <div className="card-body">
                            <p className="card-text  lh-lg">Clínica Veterinaria multidisciplinaria que ofrece diferentes especialidades, 
                                conformada por un staff de 25 Médicos Veterinarios, liderados por el Dr. Pancho Cavero, en las 
                                sedes de Barranco, Lince, San Borja, Los Olivos y San Juan de Miraflores, ofreciendo servicios médicos 
                                de calidad con el uso de equipos médicos de última generación.</p>
                                <br/>
                            <h5>Dr. Pancho Cavero</h5>
                            <p className="card-text  lh-lg">
                                Médico Veterinario egresado de la Universidad Nacional Mayor de San Marcos, líder de opinión en temas de Neurología, 
                                traumatología y Ortopedia Veterinaria, Diplomado de Traumatología y Ortopedia en CEAMVET-México y realizó una 
                                pasantía en la Clínica San Juan de Dios, 2007. Expositor de innumerables Congresos de Medicina Veterinaria y 
                                como Infuencer en temas relacionados a los animales y el medio ambiente. Condecorado en el 2011 por la UNMSM, por 
                                su contribución en el desarrollo de la Medicina Veterinaria en el Perú y Medalla Cívica de la orden Santiago de 
                                Apóstol en “Reconocimiento al desarrollo de técnicas y procedimientos innovadores en el ejercicio de la Medicina 
                                Veterinaria” por la Municipalidad de Santiago de Surco 2005</p>
                        </div>
                    </div>
                    <div className="col-md-6 p-3 d-flex align-items-center">
                        <div >
                            <img src="https://www.clinicaveterinariapanchocavero.com/assets/img/pancho.jpg" className="img-fluid rounded-start" alt="..."/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3 col-8 mx-auto rounded-4" style={{ backgroundColor: "#fff" }}>
                
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Servicios</h2>
                </div>
                <div className="m-4">
                    <div className="d-flex justify-content-center position-relative overflow-auto pb-3">
                        {
                            store.servicios_vet.map((element) => {
                                return(
                                    <CardVeterinarios key={0} title={element.servicio} image={"https://cdn-icons-png.flaticon.com/512/17781/17781111.png"} />
                                );
                            })
                        }
                    </div>

                </div>
            </div>

        </div>
    );
  };
export default Veterinarios;