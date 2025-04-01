import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardServicesProf from "../components/CardServicesProf";

const Professional = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [professional, setProfessional] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);

    // Función para obtener los datos del profesional
    const fetchProfessional = async () => {
        try {
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
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/${id}/services`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('La respuesta no es JSON válido');
            }
            
            const servicesData = await response.json();
            setServices(Array.isArray(servicesData) ? servicesData : []);
      
        } catch (error) {
            console.error("Error al obtener servicios:", error);
            setError(error.message);
            setServices([]);
        }
    };

    const fetchPets = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pets`, {
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
            setPets(data);
            dispatch({ type: "pet_info", payload: data });
        } catch (error) {
            console.error("Error fetching pets:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    fetchProfessional(),
                    fetchServices(),
                    fetchPets()
                ]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        loadData();
    }, [id, store.token]);

    if (loading) {
        return (
            <div className="py-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFDDD2", minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFDDD2", minHeight: "100vh" }}>
                <div className="alert alert-danger">Error: {error}</div>
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
            {/* Sección de Información del Profesional */}
            <div className="card mb-5 border-0 shadow-lg container">
                <div className="row g-0">
                    {/* Columna de la foto */}
                    <div className="col-md-5 p-4 d-flex align-items-center justify-content-center bg-white">
                        <img 
                            src={professional.photo || "https://i.pinimg.com/736x/04/ae/1e/04ae1ee8b69ae3fb24cebf094198b1b1.jpg"} 
                            className="img-fluid rounded-3 shadow-sm"       
                            alt="Foto del profesional"
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
            <div className="mb-3 col-8 mx-auto border-bottom rounded-4" style={{ backgroundColor: "#fff" }}>
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Servicios</h2>
                </div>
                <div className="row g-0 m-5">
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <CardServicesProf key={index} {...service} />
                        ))
                    ) : (
                        <div className="col-12 text-center py-4">
                            <p>No hay servicios disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Professional;