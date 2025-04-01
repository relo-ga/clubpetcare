import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PetUpdate = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(null);

  const [puppy, setPuppy] = useState({
    photo: "",
    emergency_phone: "",
    medical_history: "",
    age: ""
  });

  const fetchPetById = async (petId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pet/${petId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPetData(data);
 
      dispatch({ type: "pet_info", payload: data });

      setPuppy({
        photo: "",
        emergency_phone: data.phone || "",
        medical_history: data.medical_history || "",
        age: data.age || ""
      });
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };


  useEffect(() => {
    if (!store.pet || (store.pet && String(store.pet.id) !== id)) {
      fetchPetById(id);
    } else {
      setPetData(store.pet);
      setPuppy({
        photo: "",
        emergency_phone: store.pet.phone || "",
        medical_history: store.pet.medical_history || "",
        age: store.pet.age || ""
      });
    }
  }, [id, store.pet]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setPuppy((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setPuppy((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updatePET = async (petId) => {
    try {
      const petDataToUpdate = {
        emergency_phone: puppy.emergency_phone,
        medical_history: puppy.medical_history,
        age: puppy.age,
      };
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pet/${petId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${store.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petDataToUpdate)
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la mascota");
      }
      navigate("/DashboardUser");
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  if (!petData) {
    return <div>Cargando información de la mascota...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Información de {petData.name}</h1>
      <div className="d-flex justify-content-center">

        <div className="col-md-4 text-center mx-2">
          <img 
            src={petData.photo || "https://th.bing.com/th/id/OIP.Nz2KaAaoPwGwAGlOWTuOCAHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"} 
            alt="Imagen de perfil" 
            className="profile-img mb-3 col-5" 
            style={{ width: 300 }} 
          />
          <input 
            type="file" 
            className="form-control mb-3" 
            id="imageUpload" 
            accept="image/*" 
            name="photo"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
          <div id="profileForm" className="row g-3">

            <div className="mb-3 col-5">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={petData.name || ""} 
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="emergency_phone" className="form-label">Emergency Phone</label>
              <input 
                type="tel" 
                className="form-control" 
                id="emergency_phone" 
                name="emergency_phone"
                value={puppy.emergency_phone}
                placeholder={petData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="specie" className="form-label">Specie</label>
              <input 
                type="text" 
                className="form-control" 
                id="specie" 
                value={petData.specie || ""} 
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="age" className="form-label">Age</label>
              <input 
                type="number" 
                className="form-control" 
                id="age" 
                name="age"
                value={puppy.age}
                placeholder={petData.age || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="race" className="form-label">Race</label>
              <input 
                type="text" 
                className="form-control" 
                id="race" 
                value={petData.race || ""} 
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="medical_history" className="form-label">Medical History</label>
              <input 
                type="text" 
                className="form-control" 
                id="medical_history" 
                name="medical_history"
                value={puppy.medical_history}
                placeholder={petData.medical_history || ""}
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
    <label htmlFor="exampleFormControlFile1">Example file input</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
  </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              onClick={() => updatePET(id)}
            >
              Update Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetUpdate;

