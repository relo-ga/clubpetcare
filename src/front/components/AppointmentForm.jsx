import React, { useState } from 'react';

export const AppointmentForm = ({ pets, professionals }) => {
  const [formData, setFormData] = useState({
    service: '',
    petId: '',
    professionalId: '',
    date: '',
    time: '',
    duration: '',
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

  return (
    <div className="row justify-content-center mt-5 open-sans-body"> {/* Aplicamos open-sans-body al contenedor principal */}
      <div className="col-lg-6 col-md-8">
        <div className="card shadow">
          <h5 className="card-header text-center secondary text-white sour-gummy-head"> {/* Aplicamos sour-gummy-head al título */}
            Appointment
          </h5>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="professionalId" className="form-label text-primary-css sour-gummy-head"> {/* Títulos con sour-gummy-head */}
                  Professional
                </label>
                <select
                  className="form-select open-sans-body" 
                  id="professionalId"
                  name="professionalId"
                  value={formData.professionalId} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Pick a professional</option>
                  {professionals.map(pro => (
                    <option key={pro.id} value={pro.id} className="open-sans-body">{pro.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="service" className="form-label text-primary-css sour-gummy-head">
                  Service
                </label>
                <input
                  type="text"
                  className="form-control open-sans-body"
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="petId" className="form-label text-primary-css sour-gummy-head">
                  Pet
                </label>
                <select
                  className="form-select open-sans-body"
                  id="petId"
                  name="petId"
                  value={formData.petId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a pet</option>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id} className="open-sans-body">{pet.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="details" className="form-label text-primary-css sour-gummy-head">
                  Details
                </label>
                <textarea
                  className="form-control open-sans-body"
                  id="details"
                  name="details"
                  rows="3"
                  value={formData.details}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn accent text-white sour-gummy-head">
                  Solicitar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};