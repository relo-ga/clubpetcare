import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ListCompanyServices from "../components/ListCompanyServices";
import { ModalServices } from "../components/ModalServices";
import { useNavigate, Link } from "react-router-dom";


export const CompanyProfile = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState("Nombre de la Empresa");
  const [about, setAbout] = useState("Breve descripción de la empresa, su misión y visión.");
  const [hours, setHours] = useState("Urgencias 24 horas, etc.");
  const [address, setAddress] = useState("Gómez Bolaños 736")
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

  useEffect(() => {
    //if(!store.role) navigate("/")
    if (store.role == "company") fetchServices()
    if (store.role == "user") {
      navigate("/dashboarduser")
    }
  }, [store.role])

  return (
    <div style={{ backgroundColor: "#EDF6F9" }}>
      <div className="container py-5">

      <div className="text-center pb-2">
          <img src="https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=400&h=400" alt="Logo" className="mb-2 rounded-pill" />
            <Link to={`/Companyupdate/${store.profile.id}`} className="ms-3" style={{ textDecoration: 'none' }}>
              <i
                className="fa-solid fa-pencil"
                style={{ cursor: "pointer", color: "black" }}
              ></i>
            </Link>
        </div>

        <div className="text-center pb-2">
          <img src="https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=400&h=400" alt="Logo" className="mb-2 rounded-pill" />
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
          {editando ? (
            <input
              type="text"
              value={about}
              onChange={(e) => handleChange(e, "about")}
              onKeyDown={handleKeyDown}
              className="form-control text-center"
            />
          ) : (
            <p className="text-muted">
              {about}
            </p>
          )}
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
          {editando ? (
            <input
              type="text"
              value={address}
              onChange={(e) => handleChange(e, "address")}
              onKeyDown={handleKeyDown}
              className="form-control text-center"
            />
          ) : (
            <p className="text-muted">
              {address}
            </p>
          )}
        </section>


        {/* Sección de solicitud de appointment */}
        <section className="bg-white mt-4 p-4 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 style={{ color: "#006D77" }}>
              <i className="fa-solid fa-calendar-check me-2" style={{ color: "#006D77" }}></i>
              Solicitudes de Cita
            </h2>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Mascota</th>
                  <th scope="col">Servicio</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>

                {/* Ejemplo de fila */}
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=100"
                        className="rounded-circle me-2"
                        width="30"
                        height="30"
                        alt="Mascota"
                      />
                      Max
                    </div>
                  </td>
                  <td>Consulta general</td>
                  <td>15 Nov 2025</td>
                  <td>
                    <span className="badge bg-warning text-dark">Pendiente</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-success me-1">
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </td>
                </tr>

                {/* Otra fila de ejemplo */}

                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=100"
                        className="rounded-circle me-2"
                        width="30"
                        height="30"
                        alt="Mascota"
                      />
                      Luna
                    </div>
                  </td>
                  <td>Vacunación</td>
                  <td>16 Nov 2025</td>
                  <td>
                    <span className="badge bg-success">Confirmada</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </td>
                </tr>

                {/* Más filas de ejemplo */}
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100"
                        className="rounded-circle me-2"
                        width="30"
                        height="30"
                        alt="Mascota"
                      />
                      Rocky
                    </div>
                  </td>
                  <td>Cirugía</td>
                  <td>17 Nov 2025</td>
                  <td>
                    <span className="badge bg-danger">Cancelada</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-3">

          </div>
        </section>



      </div>
    </div>
  );
};