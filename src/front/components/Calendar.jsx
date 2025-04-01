import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Calendar = ({ show, onClose, onConfirm, companyId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id_service: '',
    id_pet: '',
    date: '',
    details: '',
    // datos que se llenan por la empresa
    duration: '',
    location: '',
    time: '',
    status: 'pending',


  });

  useEffect(() => {
    if (show) {
      fetchData();
    }
  }, [show]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró un token de autenticación. Por favor, inicia sesión.');
      }

      // Cargar mascotas del usuario
      const petsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!petsResponse.ok) {
        const errorData = await petsResponse.json();
        throw new Error(errorData.message || 'Error al cargar mascotas');
      }
      const petsData = await petsResponse.json();
      setPets(petsData);

      // Cargar servicios de la compañía
      const servicesResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/${companyId}/services`
      );

      if (!servicesResponse.ok) {
        const errorData = await servicesResponse.json();
        throw new Error(errorData.message || 'Error al cargar servicios');
      }
      const servicesData = await servicesResponse.json();
      setServices(servicesData);

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    if (date < new Date()) {
      alert("Por favor selecciona una fecha válida.");
      return;
    }
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0] // Formato YYYY-MM-DD
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id_pet && formData.id_service) {
      onConfirm(formData);
      handleClose();
    }
  };

  const postAppointment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No se encontró un token de autenticación. Por favor, inicia sesión.");
      return;
    }
  
    const appointmentData = {
      id_pet: formData.id_pet,
      id_service: formData.id_service,
      date: formData.date,
      details: formData.details,
      status: formData.status,
      duration: formData.duration, 
      location: formData.location, 
      time: formData.time 
    };
  
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/appointmentPotato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData); 
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
  
      const data = await response.json();
      alert("Reserva realizada con éxito");
      onClose(); // Close the modal on success
    } catch (error) {
      console.log("Error al crear cita:", error);
      alert(`Error al crear la cita: ${error.message}`);
    }
  };

  const handleConfirm = () => {
    if (formData.id_pet && formData.id_service && formData.date) {
      postAppointment();
      handleClose();
      console.log("Datos de reserva:", formData);
    } else {
      alert("Por favor completa todos los campos requeridos.");
    }
  };

  const handleClose = () => {
    setFormData({
      id_service: '',
      id_pet: '',
      date: '',
      details: ''
    });
    onClose();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#83C5BE", color: "#FFFFFF" }}>
            <h5 className="modal-title">Reservar cita</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" >
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando opciones...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">
                Error: {error}
                <button 
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={fetchData}
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label style={{ color: "#006D77" }}>Selecciona la fecha:</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    required
                    minDate={new Date()}
                    aria-label="Selecciona la fecha de la cita"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="id_pet" className="form-label" style={{ color: "#006D77" }}>
                    Mascota
                  </label>
                  <select
                    className="form-select"
                    id="id_pet"
                    name="id_pet"
                    value={formData.id_pet}
                    onChange={handleChange}
                    required
                    disabled={pets.length === 0}
                    aria-label="Selecciona una mascota"
                  >
                    <option value="">{pets.length ? "Selecciona una mascota" : "No tienes mascotas registradas"}</option>
                    {pets.map(pet => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} ({pet.specie})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="id_service" className="form-label" style={{ color: "#006D77" }}>
                    Servicio
                  </label>
                  <select
                    className="form-select"
                    id="id_service"
                    name="id_service"
                    value={formData.id_service}
                    onChange={handleChange}
                    required
                    disabled={services.length === 0}
                    aria-label="Selecciona un servicio"
                  >
                    <option value="">{services.length ? "Selecciona un servicio" : "No hay servicios disponibles"}</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="details" className="form-label" style={{ color: "#006D77" }}>
                    Detalles adicionales
                  </label>
                  <textarea
                    className="form-control"
                    id="details"
                    name="details"
                    rows="3"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Indica cualquier información adicional que debamos conocer"
                    aria-label="Detalles adicionales de la cita"
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                    style={{ backgroundColor: "#E29578", border: "none" }}
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#006D77", border: "none" }}
                    onClick={handleConfirm}
                    disabled={!formData.id_pet || !formData.id_service || !formData.date}
                  >
                    Confirmar reserva
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};