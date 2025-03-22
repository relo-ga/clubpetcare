// src/components/Calendar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ModalServices = ({ show, onClose, onConfirm }) => {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [service, setService] = useState({
          name: "",
          description: "",
          image: "",
          id_company: ""
      });
  
  const handleInputChange = (e) => {
      setService({
          ...service,
          [e.target.name]: e.target.value
      });
  };
  
  const handleFileChange= (e)=> {
    if (e.target.files) {
      setFile( e.target.files[0])
    }
  }
    

  const registerService = async (services) => {
    
    const formData = new FormData();
    formData.append('file', file);
    
      try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services`, formData, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json", // multipart/form-data habria que cambiar el tipo de dato de imagen en models.py a binario: Column(LargeBinary, nullable = True)
                  Authorization: `Bearer ${store.token}`
              },
              body: JSON.stringify(services)
          });

          const data = await response.json();
          console.log("Data: ", data);

          if (!response.ok) {
              console.error("Failed to register services");
              alert("Failed to register service ❌");
          } else {
              alert("service created successfully ✅");
              navigate("/companyprofile"); // Redirect to home or another page after successful registration
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while registering the service ❌");
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerService(service);
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
                <label for="titleServices" className="form-label">Título:</label>
                <input type="text" className="form-control" id="titleServices" placeholder="agregar un titulo" onChange={handleInputChange}/>
              </div>
              <div className="mb-3">
                <label for="descriptionServices" className="form-label">Descripción:</label>
                <textarea className="form-control" id="descriptionServices" rows="3" placeholder="agregue una breve descripción" onChange={handleInputChange}></textarea>
              </div>
              <div class="mb-3">
                <label for="uploadImageService" class="form-label">Agregar imagen:</label>
                <input class="form-control form-control-sm" id="uploadImageService" type="text" onChange={handleFileChange}/>
                {file && (
                  <div className="mb-4 text-sm">
                    <p>File name: {file.name}</p>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>Type: {file.type}</p>
                  </div>
                )}
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
