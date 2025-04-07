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
    // company-filled data
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
        throw new Error('No authentication token found. Please log in.');
      }

      // Load user's pets
      const petsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!petsResponse.ok) {
        const errorData = await petsResponse.json();
        throw new Error(errorData.message || 'Error loading pets');
      }
      const petsData = await petsResponse.json();
      setPets(petsData);

      // Load company services
      const servicesResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/${companyId}/services`
      );

      if (!servicesResponse.ok) {
        const errorData = await servicesResponse.json();
        throw new Error(errorData.message || 'Error loading services');
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
      alert("Please select a valid date.");
      return;
    }
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0] // YYYY-MM-DD format
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
      alert("No authentication token found. Please log in.");
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
      alert("Appointment booked successfully");
      onClose(); // Close the modal on success
    } catch (error) {
      console.log("Error creating appointment:", error);
      alert(`Error creating appointment: ${error.message}`);
    }
  };

  const handleConfirm = () => {
    if (formData.id_pet && formData.id_service && formData.date) {
      postAppointment();
      handleClose();
      console.log("Appointment data:", formData);
    } else {
      alert("Please complete all required fields.");
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
            <h5 className="modal-title sour-gummy-head">Book Appointment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body open-sans-body">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading options...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">
                Error: {error}
                <button 
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={fetchData}
                >
                  Retry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label style={{ color: "#006D77" }} className="sour-gummy-head">Select date:</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    required
                    minDate={new Date()}
                    aria-label="Select appointment date"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="id_pet" className="form-label sour-gummy-head" style={{ color: "#006D77" }}>
                    Pet
                  </label>
                  <select
                    className="form-select"
                    id="id_pet"
                    name="id_pet"
                    value={formData.id_pet}
                    onChange={handleChange}
                    required
                    disabled={pets.length === 0}
                    aria-label="Select a pet"
                  >
                    <option value="">{pets.length ? "Select a pet" : "You have no registered pets"}</option>
                    {pets.map(pet => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} ({pet.specie})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="id_service" className="form-label sour-gummy-head" style={{ color: "#006D77" }}>
                    Service
                  </label>
                  <select
                    className="form-select"
                    id="id_service"
                    name="id_service"
                    value={formData.id_service}
                    onChange={handleChange}
                    required
                    disabled={services.length === 0}
                    aria-label="Select a service"
                  >
                    <option value="">{services.length ? "Select a service" : "No available services"}</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="details" className="form-label sour-gummy-head" style={{ color: "#006D77" }}>
                    Additional details
                  </label>
                  <textarea
                    className="form-control"
                    id="details"
                    name="details"
                    rows="3"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Provide any additional information we should know"
                    aria-label="Appointment additional details"
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary sour-gummy-head"
                    onClick={onClose}
                    style={{ backgroundColor: "#E29578", border: "none" }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary sour-gummy-head"
                    style={{ backgroundColor: "#006D77", border: "none" }}
                    onClick={handleConfirm}
                    disabled={!formData.id_pet || !formData.id_service || !formData.date}
                  >
                    Confirm Booking
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