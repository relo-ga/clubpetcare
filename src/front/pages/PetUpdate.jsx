import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PetUpdate = () => {

  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(null);

  const [puppy, setPuppy] = useState({
    photo: null,
    emergency_phone: "",
    weight: "",
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
        emergency_phone: data.emergency_phone || "",
        weight: data.weight || "",
        birthdate: data.birthdate || ""
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
        emergency_phone: store.pet.emergency_phone || "",
        weight: store.pet.weight || "",
        birthdate: store.pet.birthdate || "",
      });
    }
  }, [id, store.pet]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setPuppy((prev) => ({ ...prev, photo: file }));
    } else {
      setPuppy((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async () => {

    const formData = new FormData();
    formData.append("file", puppy.photo);
    formData.append('upload_preset', 'ClubPetCare');

    try {
      const cloudName = "dqs8bd3ts"
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        console.log("Error uploading image");
        alert("There was an error uploading the image ❌");
        return
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("There was an error uploading the image ❌");
    }
  }

  const updatePET = async (petId) => {
    try {

      const photoUrl = puppy.photo ? await uploadImage() : null;

      const petDataToUpdate = {
        ...(photoUrl ? { photo: photoUrl } : {}),
        emergency_phone: puppy.emergency_phone,
        weight: puppy.weight,
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
        throw new Error("Failed to update pet");
      }
      navigate("/DashboardUser");
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  const getPetImage = () => {
    console.log("puppy: ", puppy);
    console.log("petData: ", petData);
    if (puppy.photo) {
      return URL.createObjectURL(puppy.photo);
    }
    if (petData && petData.photo && !puppy.photo) {
      return petData.photo;
    }
    return "https://th.bing.com/th/id/OIP.Nz2KaAaoPwGwAGlOWTuOCAHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  }

  if (!petData) {
    return <div>Cargando información de la mascota...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 open-sans-body">Información de {petData.name}</h1>
      <div className="d-flex justify-content-center">

        <div className="col-md-4 text-center mx-2">

          <img src={getPetImage()}
            alt="Imagen de mascota" className="profile-img mb-3 col-5" id="petImg" style={{ width: 300 }} />
          <input type="file" className="form-control mb-3 open-sans-body" id="imageUpload" accept="image/*"
            onChange={handleChange} name="photo"
          />
          <button className="btn btn-primary" id="cameraBtn" onClick={() => setPuppy({ ...puppy, photo: null })}>
            <span className="camera-text open-sans-body">Clear Image</span>
          </button>

        </div>

        <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
          <div id="profileForm" className="row g-3">

            <div className="mb-3 col-5">
              <label htmlFor="name" className="form-label open-sans-body">Name</label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="name"
                value={petData.name || ""}
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="specie" className="form-label open-sans-body">Specie</label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="specie"
                value={petData.specie || ""}
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="birtdate" className="form-label open-sans-body">Birthdate</label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="birthdate"
                name="birthdate"
                value={petData.birthdate}
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="race" className="form-label open-sans-body">Race</label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="race"
                value={petData.race || ""}
                readOnly
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="weight" className="form-label open-sans-body">Weight</label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="weight"
                name="weight"
                value={puppy.weight}
                placeholder={petData.weight || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="emergency_phone" className="form-label open-sans-body">Emergency Phone</label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="emergency_phone"
                name="emergency_phone"
                value={puppy.emergency_phone}
                placeholder={petData.emergency_phone || ""}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary open-sans-body"
              onClick={() => updatePET(id)}
            >
              Update Changes
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default PetUpdate;

