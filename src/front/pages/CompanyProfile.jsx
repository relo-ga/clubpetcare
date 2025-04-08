

import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ListCompanyServices from "../components/ListCompanyServices";
import { ModalServices } from "../components/ModalServices";
import { useNavigate, Link } from "react-router-dom";

export const CompanyProfile = () => {

  const [companyName, setCompanyName] = useState("Company Name");
  const [hours, setHours] = useState("24-hour Emergency, etc.");
  const [editing, setEditing] = useState(false);

  const handleChange = (e, field) => {
    if (field === "name") setCompanyName(e.target.value);
    if (field === "about") setAbout(e.target.value);
    if (field === "hours") setHours(e.target.value);
    if (field === "address") setAddress(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = store.profile;

  // Modal Services state
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleReservarClick = () => {
    setShowModal(true);
  };
  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle service booking
  const handleReservar = async () => {
    alert("Service successfully added ✅");
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
      
      // Update local state
      const updatedAppointments = store.appointments.map(appt => 
        appt.id === id ? { ...appt, status } : appt
      );
      dispatch({ type: "load_appointments", payload: updatedAppointments });
      
      return true; // Indicates success
      
    } catch (error) {
      console.error("Error:", error);
      return false; // Indicates failure
    }
  };

  // Handler to approve an appointment
  const handleApprove = (id) => {
    updateAppointmentStatus(id, "approved");
    alert("Appointment approved successfully ✅");
  };

  // Handler to reject an appointment
  const handleReject = (id) => {
    updateAppointmentStatus(id, "rejected");
    alert("Appointment rejected successfully ❌");
  };

  useEffect(() => {
    // If the role is not user, fetch services and appointments
    if (store.role !== "user") {
      fetchServices();
      fetchAppointments();
    }
    // If the role is user, redirect to user dashboard
    if (store.role === "user") {
      navigate("/dashboarduser");
    }
  }, [store.role]);

  const getProfileImage = () => {
    if (business.photo) {
      return URL.createObjectURL(business.photo);
    }
    if (store.profile && store.profile.photo && !business.photo) {
      return store.profile.photo;
    }
    return "https://res.cloudinary.com/dqs8bd3ts/image/upload/v1696345012/ClubPetCare/DefaultProfileImage.png";
  };

  return (
    <div style={{ backgroundColor: "#EDF6F9" }}>
      <div className="container py-5">
        <div className="text-center pb-2">
          <img
            src={store.profile && store.profile?.photo || "https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png"}
            alt="Logo"
            className="rounded-circle"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              border: "5px solid #006D77"
            }}
          />
          <Link to={`/Companyupdate/${id}`} className="ms-3" style={{ textDecoration: 'none' }}>
            <i
              className="fa-solid fa-pencil"
              style={{ cursor: "pointer", color: "black" }}
            ></i>
          </Link>
        </div>

        <header className="text-white text-center py-2 rounded" style={{ backgroundColor: "#006D77" }}>
          {editing ? (
            <input
              type="text"
              value={companyName}
              onChange={(e) => handleChange(e, "name")}
              onKeyDown={handleKeyDown}
              className="form-control text-center"
              autoFocus
            />
          ) : (
            <h1 className="display-5 open-sans-body">
              {store.profile && store.profile?.name_company || "Company Name"}
            </h1>
          )}
        </header>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h2 className="border-bottom pb-2 mb-0 open-sans-body" style={{ color: "#006D77" }}>
            <i className="fa-solid fa-calendar-days me-1"></i>Today's Reminders
          </h2>
          <div className="d-flex text-body-secondary pt-3">
            <i className="fa-solid fa-shield-cat me-3" style={{ color: "#E29578" }}></i>
            <p className="pb-3 mb-0 small lh-sm border-bottom sour-gummy-head">
              <strong className="d-block text-gray-dark sour-gummy-head">@username</strong>
              Some representative placeholder content with some information about this user. Imagine this being some sort of status update.
            </p>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="fa-solid fa-shield-cat me-3" style={{ color: "#E29578" }}></i>
            <p className="pb-3 mb-0 small lh-sm border-bottom sour-gummy-head">
              <strong className="d-block text-gray-dark sour-gummy-head">@username</strong>
              Some more representative placeholder content related to this other user. Another status update, perhaps.
            </p>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="fa-solid fa-shield-cat me-3" style={{ color: "#E29578" }}></i>
            <p className="pb-3 mb-0 small lh-sm border-bottom sour-gummy-head">
              <strong className="d-block text-gray-dark sour-gummy-head">@username</strong>
              This user also gets some representative placeholder content. Maybe they did something interesting, and you really want to highlight this in the recent updates.
            </p>
          </div>
          <small className="d-block text-end mt-3">
            <a href="#">All updates</a>
          </small>
        </div>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          <h2 className="open-sans-body" style={{ color: "#006D77" }}>
            <i className="fa-solid fa-briefcase-medical me-1" style={{ color: "#006D77" }}></i>About Us
          </h2>
          <p className="sour-gummy-head">
            {store.profile && store.profile?.description || "Company description"}
          </p>
        </section>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          {/* Modal for service booking */}
          <ModalServices show={showModal} onClose={handleCloseModal} onConfirm={handleReservar} />
          <h2 className="open-sans-body" style={{ color: "#006D77" }}>
            <i className="fa-solid fa-paw me-1" style={{ color: "#006D77" }}></i>Our Services
          </h2>
          <div className="list-group sour-gummy-head text-muted">
            {
              store.services_company.map((element, index) => {
                return (
                  <ListCompanyServices
                    key={index}
                    className="list-group-item open-sans-body"
                    service={element.name}
                    description={element.description}
                    image={element.image}
                  />
                )
              })
            }
          </div>
          <div className="d-flex align-items-center mt-3 ms-3">
            <p className="fw-bold m-0 me-2 open-sans-body">Add service</p>
            <button type="button" className="btn btn-outline-dark rounded-pill" onClick={handleReservarClick}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </section>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          <h2 className="open-sans-body" style={{ color: "#006D77" }}>
            <i className="fa-solid fa-clock me-1" style={{ color: "#006D77" }}></i>Hours
          </h2>
          {editing ? (
            <input
              type="text"
              value={hours}
              onChange={(e) => handleChange(e, "hours")}
              onKeyDown={handleKeyDown}
              className="form-control text-center"
            />
          ) : (
            <p className="text-muted sour-gummy-head">
              {hours}
            </p>
          )}
        </section>

        <section className="bg-white mt-4 p-3 rounded shadow-sm">
          <h2 className="open-sans-body" style={{ color: "#006D77" }}>
            <i className="fa-solid fa-location-dot me-1" style={{ color: "#006D77" }}></i>Location
          </h2>
          <p className="text-muted sour-gummy-head">
            {store.profile && store.profile?.location || "Company location"}
          </p>
        </section>

        {/* Appointment Section */}
        <section className="bg-white mt-4 p-4 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="open-sans-body" style={{ color: "#006D77" }}>
              <i className="fa-solid fa-calendar-check me-2" style={{ color: "#006D77" }}></i>
              Appointment Requests
            </h2>
          </div>

          {store.appointments?.length > 0 ? (
            <div className="table-responsive">
              <table className="table open-sans-body">
                <thead>
                  <tr>
                    <th>Pet</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {store.appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="sour-gummy-head">
                        <img
                          src={appointment.photo || "https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg"}
                          alt="Pet"
                          className="rounded-circle me-2"
                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        {appointment.pet_name || "No name"}
                      </td>
                      <td className="sour-gummy-head">
                        {appointment.service_name || "No service"}
                      </td>
                      <td className="sour-gummy-head">
                        {new Date(appointment.date).toLocaleString()}
                      </td>
                      <td className="sour-gummy-head">
                        <span className={`badge ${
                          appointment.status === "approved" ? "bg-success" :
                          appointment.status === "rejected" ? "bg-danger" : "bg-warning"
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="sour-gummy-head">
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
            <p className="text-muted open-sans-body">No pending appointment requests</p>
          )}
        </section>
      </div>
    </div>
  );
};
