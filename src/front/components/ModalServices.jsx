// src/components/Calendar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ModalServices = ({ show, onClose, onConfirm }) => {

  const { store, dispatch } = useGlobalReducer();

  const navigate = useNavigate();

  const [service, setService] = useState({
          name: "",
          description: "",
          image: "",
          id_company: ""
      });
  
  const handleInputChange = (e) => {
      setService({
          ...service,
          [e.target.name]: e.target.value,
          id_company: store.profile?.id
      });
  };

  const registerService = async (services) => {
    
      try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json", // multipart/form-data habria que cambiar el tipo de dato de imagen en models.py a binario: Column(LargeBinary, nullable = True)
              },
              body: JSON.stringify(services)
          });

          const data = await response.json();
          console.log("Data: ", data);

          if (!response.ok) {
              console.error("Failed to register services");
              alert("Failed to register service ❌");
          } else {
              //alert("service created successfully ✅");
              navigate("/companyprofile");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while registering the service ❌");
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerService(service);
    onConfirm()
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#83C5BE", color: "#FFFFFF" }}>
            <h5 className="modal-title">Agregar Servicio</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="titleServices" className="form-label">Título:</label>
                <input type="text" className="form-control" id="titleServices" placeholder="agregar un titulo" name="name" onChange={handleInputChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionServices" className="form-label">Descripción:</label>
                <textarea className="form-control" id="descriptionServices" rows="3" placeholder="agregue una breve descripción" name="description" onChange={handleInputChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="uploadImageService" className="form-label">Agregar imagen:</label>
                <input className="form-control form-control-sm" id="uploadImageService" type="text" name="image" onChange={handleInputChange}/>
              </div>
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
              onClick={handleSubmit}
              style={{ backgroundColor: "#006D77", border: "none" }}
            >
              Agregar Servicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
