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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(services)
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (!response.ok) {
        console.error("Failed to register services");
        alert("Failed to register service ❌");
      } else {
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
    onConfirm();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header" style={{ backgroundColor: "#83C5BE", color: "#FFFFFF" }}>
            <h5 className="modal-title sour-gummy-head">Add New Service</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body open-sans-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="titleServices" className="form-label sour-gummy-head">
                  Service Title:
                </label>
                <input 
                  type="text" 
                  className="form-control open-sans-body" 
                  id="titleServices" 
                  placeholder="Enter service title" 
                  name="name" 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="descriptionServices" className="form-label sour-gummy-head">
                  Description:
                </label>
                <textarea 
                  className="form-control open-sans-body" 
                  id="descriptionServices" 
                  rows="4" 
                  placeholder="Add a brief description" 
                  name="description" 
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="uploadImageService" className="form-label sour-gummy-head">
                  Image URL:
                </label>
                <input 
                  className="form-control open-sans-body" 
                  id="uploadImageService" 
                  type="text" 
                  name="image" 
                  onChange={handleInputChange}
                  placeholder="Paste image URL here"
                />
                <small className="text-muted mt-1 d-block">
                  Note: Currently supports URL only. For file uploads, backend changes would be needed.
                </small>
              </div>
              <div className="modal-footer border-top-0 px-0 pt-0">
                <button
                  type="button"
                  className="btn btn-secondary sour-gummy-head"
                  onClick={onClose}
                  style={{ 
                    backgroundColor: "#E29578", 
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 20px"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary sour-gummy-head"
                  style={{ 
                    backgroundColor: "#006D77", 
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 20px"
                  }}
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};