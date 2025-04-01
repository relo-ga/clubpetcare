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
    serviceId: '',
    petId: '',
    date: '',
    details: ''
  });

  // Cargar pets y servicios cuando se muestra el modal
  useEffect(() => {
    if (show) {
      fetchData();
    }
  }, [show]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar mascotas del usuario
      const token = localStorage.getItem('token');
      const petsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!petsResponse.ok) throw new Error('Error al cargar mascotas');
      const petsData = await petsResponse.json();
      setPets(petsData);

      // Cargar servicios de la compañía
      const servicesResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/${companyId}/services`
      );
      
      if (!servicesResponse.ok) throw new Error('Error al cargar servicios');
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
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.petId && formData.serviceId) {
      onConfirm(formData);
    }
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
                <div className="spinner-border text-primary" role="status">
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
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="petId" className="form-label" style={{ color: "#006D77" }}>
                    Mascota
                  </label>
                  <select
                    className="form-select"
                    id="petId"
                    name="petId"
                    value={formData.petId}
                    onChange={handleChange}
                    required
                    disabled={pets.length === 0}
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
                  <label htmlFor="serviceId" className="form-label" style={{ color: "#006D77" }}>
                    Servicio
                  </label>
                  <select
                    className="form-select"
                    id="serviceId"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    required
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