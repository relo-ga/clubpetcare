import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardServicesProf from "../components/CardServicesProf";

const Professional = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const [professional, setProfessional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([
        {
            name: "Consulta general",
            description: "Consulta general para tu mascota",
            image: "https://i.pinimg.com/736x/7e/01/b9/7e01b9e8cd0046be652ec93a5fcb3ef4.jpg"
        },
        {
            name: "Vacunación",
            description: "Vacuna a tu mascota",
            image: "https://i.pinimg.com/736x/ce/a7/05/cea70527a5197bd636eb0ce1f438c6a2.jpg"
        },
        {
            name: "Cirugía",
            description: "Cirugía para tu mascota",
            image: "https://i.pinimg.com/736x/c4/cc/d3/c4ccd300e1e5932fdf095423a8774a75.jpg"
        },
       
        
    ]);

    // Función para obtener los datos del profesional
    const fetchProfessional = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setProfessional(data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching professional:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfessional();
    }, [id]); // Se ejecuta cuando cambia el ID

    if (loading) {
        return (
            <div className="py-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFDDD2", minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    

    if (!professional) {
        return (
            <div className="py-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFDDD2", minHeight: "100vh" }}>
                <div className="alert alert-warning">Profesional no encontrado</div>
            </div>
        );
    }

    return (
        <div className="py-4" style={{ backgroundColor: "#FFDDD2" }}>
            {/* Sección de información del profesional */}
            {/* Sección de Información del Profesional */}
<div className="card mb-5 border-0 shadow-lg container">
  <div className="row g-0">
    {/* Columna de la foto */}
    <div className="col-md-5 p-4 d-flex align-items-center justify-content-center bg-white">
      <img 
        src={professional.photo || "https://i.pinimg.com/736x/04/ae/1e/04ae1ee8b69ae3fb24cebf094198b1b1.jpg"} 
        className="img-fluid rounded-3 shadow-sm"       
      />
    </div>

    {/* Columna de la información */}
    <div className="col-md-7 p-4 bg-light">
      <div className="p-3">
        <h1 className="display-5 fw-bold mb-4" style={{ color: "#006D77" }}>
          {professional.name_company}
        </h1>
        
        {/* Información de contacto */}
        <div className="contact-info">
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-geo-alt-fill me-3 fs-4" style={{ color: "#006D77" }}></i>
            <div>
              <h5 className="mb-1 fw-semibold">Ubicación</h5>
              <p className="mb-0">{professional.location || "No especificada"}</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-telephone-fill me-3 fs-4" style={{ color: "#006D77" }}></i>
            <div>
              <h5 className="mb-1 fw-semibold">Teléfono</h5>
              <p className="mb-0">{professional.phone || "No disponible"}</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-envelope-fill me-3 fs-4" style={{ color: "#006D77" }}></i>
            <div>
              <h5 className="mb-1 fw-semibold">Email</h5>
              <p className="mb-0">{professional.email || "No disponible"}</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center">
            <i className="bi bi-clock-fill me-3 fs-4" style={{ color: "#006D77" }}></i>
            <div>
              <h5 className="mb-1 fw-semibold">Horario</h5>
              <p className="mb-0">{professional.schedule || "No especificado"}</p>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  </div>
</div>
            
            {/* Sección de descripción */}
            <div className="mb-3 col-8 mx-auto border-bottom rounded-4" style={{ backgroundColor: "#fff" }}>
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Descripción</h2>
                </div>
                <div className="row g-0 m-5">
                    <div className="col-md-12 p-3">
                        <div className="card-body">
                            <p className="card-text lh-lg">
                                {professional.description || "Información no disponible :("}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de servicios */}
            <div className="mb-3 col-8 mx-auto rounded-4" style={{ backgroundColor: "#fff" }}>
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Servicios</h2>
                </div>
                <div className="m-4">
                    <div className="d-flex justify-content-center position-relative overflow-auto pb-3">
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {services.map((service, index) => (
                                <CardServicesProf key={index} {...service} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Professional;