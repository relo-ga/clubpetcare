import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./colors.css";
import { Calendar } from "../components/Calendar";
import { AppointmentForm } from "../components/AppointmentForm";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DashboardUser = () => {
  // Hooks
  const [loading, setLoading] = useState(true);
  const [loadingProfessionals, setLoadingProfessionals] = useState(true);
  const { store, dispatch } = useGlobalReducer();

  const [pets, setPets] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  const [formData, setFormData] = useState({
    service: "",
    petId: "",
    professionalId: ""
  });

  const navigate = useNavigate();

  const fetchProfessionals = async () => {
    try {
      setLoadingProfessionals(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company`, {
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
      
      if (!Array.isArray(data)) {
        throw new Error("Los datos recibidos no son válidos");
      }
      
      setProfessionals(data);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    } finally {
      setLoadingProfessionals(false);
    }
  };

  const fetchPets = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cargar mascotas y profesionales en paralelo
    const loadData = async () => {
      try {
        await Promise.all([fetchPets(), fetchProfessionals()]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    //if(!store.role) navigate("/")
    if(store.role == "user") loadData();
    if(store.role == "company"){
      navigate("/companyprofile")
    }

  }, [store.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Solicitud de cita enviada correctamente");
  };

  return (
    <div className="container-fluid p-4 background">
      {/** Sección de Pets */}
      <div className="d-flex justify-content-center">
        <div className="card shadow" style={{ width: "40rem", height: "23rem" }}>
          <h5 className="card-header text-center primary text-white">Pets</h5>
          <div className="card-body">
            <h1 className="text-center">
              <i className="fa-solid fa-paw text-primary-css"></i>
            </h1>
            <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
              {loading ? (
                <div className="spinner-border text-primary-css" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : pets && Array.isArray(pets) && pets.length > 0 ? (
                pets.map(pet => (
                  <div key={pet.id} className="text-center position-relative">
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={() => navigate(`/profilepet/${pet.id}`)}
                    >
                      <img
                        src={pet.photo || "https://images3.memedroid.com/images/UPLOADED537/665c8560a1300.jpeg"}
                        className="rounded-circle"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        alt={pet.name}
                      />
                      {pet.hasPending && (
                        <span className="position-absolute translate-middle p-2 bg-danger rounded-circle"></span>
                      )}
                    </button>
                    <h5 className="mt-2 text-primary-css">{pet.name}</h5>
                  </div>
                ))
              ) : (
                <p>No se encontraron mascotas.</p>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="text-primary-css">¿Tienes un familiar nuevo?</h4>
              <button
                className="btn rounded-pill accent text-white"
                onClick={() => navigate("/registerpet")}
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/** Sección de Recordatorios */}
      <div className="row justify-content-center mt-5">
        <div className="" style={{ width: "60rem" }}>
          <div className="card shadow">
            <h5 className="card-header text-center secondary text-white">
              <i className="fa-solid fa-calendar-days me-2"></i>Recordatorios para hoy
            </h5>
            <div className="card-body">
              <div className="">
                {/* Recordatorio 1 */}
                <div className="d-flex align-items-center p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center secondary" style={{ width: "40px", height: "40px" }}>
                      <i className="fa-solid fa-bell text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <strong className="text-primary-css">Vacunación para Capy</strong>
                    <p className="mb-0 small text-muted">Llevar a Capy al veterinario para su vacuna anual.</p>
                  </div>
                </div>
                <hr />
                {/* Recordatorio 2 */}
                <div className="d-flex align-items-center p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center secondary" style={{ width: "40px", height: "40px" }}>
                      <i className="fa-solid fa-bell text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <strong className="text-primary-css">Corte de pelo para Titan</strong>
                    <p className="mb-0 small text-muted">Reservar cita para el corte de pelo de Titan.</p>
                  </div>
                </div>
                <hr />
                {/* Recordatorio 3 */}
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center secondary" style={{ width: "40px", height: "40px" }}>
                      <i className="fa-solid fa-bell text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <strong className="text-primary-css">Comprar comida para mascotas</strong>
                    <p className="mb-0 small text-muted">Comprar comida premium para Capy y Titan.</p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <a className="text-decoration-none accent">
                  Ver todos los recordatorios <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Seccion de Profesionales Cercanos */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-10 col-md-12">
          <h2 className="text-primary-css">Nearby Professionals</h2>
          {loadingProfessionals ? (
            <div className="text-center">
              <div className="spinner-border text-primary-css" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Cargando profesionales...</p>
            </div>
          ) : professionals && professionals.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {professionals.map(pro => (
                <div className="col" key={pro.id}>
                  <div className="card h-100 shadow">
                    <h5 className="card-header text-center secondary text-white">
                      {pro.specialty || "Professional"}
                    </h5>
                    <div className="card-body text-center">
                      <img
                        src={pro.photo || "https://i.pinimg.com/736x/f7/17/a9/f717a96b10ca251eab6282165ea37fb7.jpg"}
                        className="rounded-circle mb-3"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        alt={pro.name}
                      />
                      <p className="card-text text-primary-css">
                        <strong>Name:</strong> {pro.name_company}<br />
                        <strong>Services:</strong> {pro.service || "N/A"}<br />
                        <strong>Phone:</strong> {pro.phone || "N/A"}<br />
                        <strong>Email:</strong> {pro.email || "N/A"}<br />
                        <strong>Location:</strong> {pro.location || "N/A"}
                      </p>
                      <button
                        className="btn accent text-white"
                        onClick={() => navigate(`/Professional/${pro.id}`)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              No se encontraron profesionales disponibles.
            </div>
          )}
        </div>
        
      </div>
      {/** Formulario de solicitud de cita */}
      
    </div>
  );
};