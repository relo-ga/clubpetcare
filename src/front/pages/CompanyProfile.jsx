import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ListCompanyServices from "../components/ListCompanyServices";
import { ModalServices } from "../components/ModalServices";
import { useNavigate, Link } from "react-router-dom";


export const CompanyProfile = () => {

  const [nombreEmpresa, setNombreEmpresa] = useState("Nombre de la Empresa");
  const [hours, setHours] = useState("Urgencias 24 horas, etc.");
  const [editando, setEditando] = useState(false);

  const handleChange = (e, campo) => {
    if (campo === "nombre") setNombreEmpresa(e.target.value);
    if (campo === "about") setAbout(e.target.value);
    if (campo === "hours") setHours(e.target.value);
    if (campo === "address") setAddress(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditando(false);
    }
  };

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = store.profile;

  //Modal Services
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para abrir el modal
  const handleReservarClick = () => {
    setShowModal(true);
  };
  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para manejar el servicio
  const handleReservar = async () => {
    alert("Servicio agregado con éxito ✅");
    await fetchServices();
    setShowModal(false);
  };

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      setServices(data);
      //console.log(data)
      dispatch({ type: "load_services", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      console.log(data)
      dispatch({ type: "load_appointments", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
        body: JSON.stringify({ status })
      });
  
      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }
  
      const data = await response.json();
      
      // Actualiza el estado local
      const updatedAppointments = store.appointments.map(appt => 
        appt.id === id ? { ...appt, status } : appt
      );
      dispatch({ type: "load_appointments", payload: updatedAppointments });
      
      return true; // Indica éxito
      
    } catch (error) {
      console.error("Error:", error);
      return false; // Indica fallo
    }
  };
  // Handler para aprobar
  const handleApprove = (id) => {
    updateAppointmentStatus(id, "approved");
    alert("Cita aprobada con éxito ✅");

  };

  // Handler para rechazar
  const handleReject = (id) => {
    updateAppointmentStatus(id, "rejected");
    alert("Cita rechazada con éxito ❌");
  };

  useEffect(() => {
    //if(!store.role) navigate("/")
    if (store.role != "user") {
      fetchServices()
      fetchAppointments();
    }
    if (store.role == "user") {
      navigate("/dashboarduser")
    }
  }, [store.role])

  return (
    <div style={{ backgroundColor: "#EDF6F9" }}>
      <div className="container py-5">
        <div className="text-center pb-2">
          <img src={store.profile && store.profile?.image || "https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png"} alt="Logo" className="mb-2 rounded-pill" />
          <Link to={`/petUpdate/${id}`} className="ms-3" style={{ textDecoration: 'none' }}>
            <i
              className="fa-solid fa-pencil"
              style={{ cursor: "pointer", color: "black" }}
            ></i>
          </Link>
        </div>

        <header className="text-white text-center py-2 rounded" style={{ backgroundColor: "#006D77" }}>
          {editando ? (
            <input
              type="text"
              value={nombreEmpresa}
              onChange={(e) => handleChange(e, "nombre")}
              onKeyDown={handleKeyDown}
              className="form-control text-center"
              autoFocus
            />
          ) : (
            <h1 className="display-5">
              {nombreEmpresa}
            </h1>
          )}
        </header>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h2 className="border-bottom pb-2 mb-0" style={{ color: "#006D77", }}><i className="fa-solid fa-calendar-days me-1"></i>Recordatorios para hoy</h2>
          <div className="d-flex text-body-secondary pt-3">
            <i className="fa-solid fa-shield-cat me-3" style={{ color: "#E29578", }}></i>
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">@username</strong>
              Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
            </p>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="fa-solid fa-shield-cat me-3" style={{ color: "#E29578", }}></i>
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">@username</strong>
              Some more representative placeholder content, related to this other user. Another status update, perhaps.
            </p>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="fa-solid fa-shield-cat me-3" style={{ color: "#E29578", }}></i>
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">@username</strong>
              This user also gets some representative placeholder content. Maybe they did something interesting, and you really want to highlight this in the recent updates.
            </p>
          </div>
          <small className="d-block text-end mt-3">
            <a href="#">All updates</a>
          </small>
        </div>



        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          <h2 style={{ color: "#006D77", }}>
            <i className="fa-solid fa-briefcase-medical me-1" style={{ color: "#006D77", }}></i>Sobre Nosotros</h2>
          <p>
            {store.profile && store.profile?.description || "Descripción de la empresa"}
          </p>
        </section>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          {/* Modal para reservar */}
          <ModalServices show={showModal} onClose={handleCloseModal} onConfirm={handleReservar} />
          <h2 style={{ color: "#006D77", }}><i className="fa-solid fa-paw me-1" style={{ color: "#006D77", }}></i>Nuestros Servicios</h2>
          <div className="list-group">
            {
              store.services_company.map((element, index) => {
                return (
                  <ListCompanyServices key={index} className="list-group-item" service={element.name} description={element.description} image={element.image} />
                )
              })
            }
          </div>
          <div className="d-flex align-items-center mt-3 ms-3">
            <p className="fw-bold m-0 me-2">Agregar servicio</p>
            <button type="button" className="btn btn-outline-dark rounded-pill" onClick={handleReservarClick}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </section>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          <h2 style={{ color: "#006D77", }}>
            <i className="fa-solid fa-clock me-1" style={{ color: "#006D77", }}></i>Horarios</h2>
          {editando ? (
            <input
              type="text"
              value={hours}
              onChange={(e) => handleChange(e, "hours")}
              onKeyDown={handleKeyDown}
              className="form-control text-center"
            />
          ) : (
            <p className="text-muted">
              {hours}
            </p>
          )}

        </section>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          <h2 style={{ color: "#006D77", }}><i className="fa-solid fa-location-dot me-1" style={{ color: "#006D77", }}></i>Ubicación</h2>
          <p>
            {store.profile && store.profile?.location || "Ubicación de la empresa"}
          </p>
        </section>


        {/* Sección  de appointment */}
        {/* Sección de appointment - SOLO ESTA SECCIÓN CAMBIA */}
<section className="bg-white mt-4 p-4 rounded shadow-sm">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 style={{ color: "#006D77" }}>
      <i className="fa-solid fa-calendar-check me-2" style={{ color: "#006D77" }}></i>
      Solicitudes de Cita
    </h2>
  </div>

  {store.appointments?.length > 0 ? (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {store.appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                <img
                  src={appointment.photo || "https://i.pinimg.com/736x/55/4e/b3/554eb3a5fd27256e7949c8221807b8f5.jpg"}
                  alt="Pet"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                {appointment.pet_name || "No name"}
              </td>
              <td>{appointment.service_name || "No service"}</td>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>
                <span className={`badge ${
                  appointment.status === "approved" ? "bg-success" :
                  appointment.status === "rejected" ? "bg-danger" : "bg-warning"
                }`}>
                  {appointment.status}
                </span>
              </td>
              <td>
                {appointment.status === "pending" && (
                  <>
                    <button
                      className="btn btn-sm btn-outline-success me-1"
                      onClick={() => handleApprove(appointment.id)}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleReject(appointment.id)}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-muted">No hay solicitudes de cita pendientes</p>
  )}
</section>



      </div>
    </div>
  );
};