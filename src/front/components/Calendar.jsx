// src/components/Calendar.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilos de react-datepicker

export const Calendar = ({ show, onClose, onConfirm, pets = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada

  const [formData, setFormData] = useState({
    service: '',
    petId: '',
    date: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    console.log(formData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0] // Formato YYYY-MM-DD
    });
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label style={{ color: "#006D77" }}>Selecciona la fecha:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="petId" className="form-label" style={{ color: "#006D77" }}>Mascota</label>
                <select
                  className="form-select"
                  id="petId"
                  name="petId"
                  value={formData.petId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una mascota</option>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="petId" className="form-label" style={{ color: "#006D77" }}>Servicio</label>
                <select
                  className="form-select"
                  id="petId"
                  name="petId"
                  value={formData.petId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  
                </select>
              </div>
              <div>
                <label htmlFor="details" className="form-label" style={{ color: "#006D77" }}>Detalles</label>
                <textarea
                  className="form-control"
                  id="details"
                  name="details"
                  rows="3"
                  value={formData.details}
                  onChange={handleChange}
                ></textarea>
              </div>
            </form>
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
              type="button"
              className="btn btn-primary"
              onClick={() => onConfirm({ ...formData, date: selectedDate })}
              style={{ backgroundColor: "#006D77", border: "none" }}
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};