// src/components/Calendar.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilos de react-datepicker

export const Calendar = ({ show, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada

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
            <div className="mb-3">
              <label style={{ color: "#006D77" }}>Selecciona la fecha y hora:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Hora"
                dateFormat="dd/MM/yyyy h:mm aa"
                className="form-control"
              />
            </div>
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
              onClick={() => onConfirm(selectedDate)}
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

