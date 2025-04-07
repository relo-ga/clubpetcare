import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Registerpet = () => {
  const navigate = useNavigate();
  const { store } = useGlobalReducer();

  const [pet, setPet] = useState({
    name: "",
    gender: "",
    photo: "",
    medical_history: "",
    race: "",
    emergency_phone: "",
    birthdate: "",
    weight: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setPet({ ...pet, photo: file });
    } else {
      setPet({ ...pet, [name]: value });
    }
  };

  const register = async (pet) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/createpet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(pet),
        }
      );

      const data = await response.json();
      console.log("Data:", data);

      if (!response.ok) {
        console.error("Failed to register pet");
        alert("Failed to register pet ❌");
      } else {
        alert("Pet created successfully ✅");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the pet ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = "";
    if (pet.photo) {
      photoUrl = await uploadImage();
    }
    const newPet = { ...pet, photo: photoUrl };
    register(newPet);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", pet.photo);
    formData.append("upload_preset", "ClubPetCare");

    try {
      const cloudName = "dqs8bd3ts";
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        console.log("Error uploading image");
        alert("There was an error uploading the image ❌");
        return "";
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("There was an error uploading the image ❌");
    }
  };

  const getPetImage = () => {
    if (pet.photo) {
      return URL.createObjectURL(pet.photo);
    }
    return "https://images3.memedroid.com/images/UPLOADED537/665c8560a1300.jpeg";
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
    
        <div className="col-12 col-md-8 col-lg-6 mx-auto rounded-4 pb-2">
          <div
            className="d-flex flex-wrap justify-content-around align-items-center fs-1 border rounded p-3 mb-4"
            style={{ backgroundColor: "#FFDDD2" }}
          >
            <div className="mx-2">
              <i className="fa-solid fa-cat"></i>
            </div>
            <h1 className="text-center">Pet Information</h1>
            <div className="mx-2">
              <i className="fa-solid fa-dog"></i>
            </div>
          </div>

          <div className="border rounded p-3" style={{ backgroundColor: "#FFDDD2" }}>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column align-items-center">

                <div className="mb-3 text-center">
                  <img
                    src={getPetImage()}
                    alt="Imagen de mascota"
                    className="profile-img mb-2 rounded-circle"
                    id="petImg"
                    style={{ width: 300 }}
                  />
                  <input
                    type="file"
                    className="form-control mb-3"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleInputChange}
                    name="photo"
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="cameraBtn"
                    onClick={() => setPet({ ...pet, photo: null })}
                  >
                    <span className="camera-text">Clear Image</span>
                  </button>
                </div>

                <div className="form-floating my-2 w-100">
                  <input
                    type="text"
                    className="form-control text-center"
                    id="floatingInput"
                    placeholder="Pet Name"
                    name="name"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput">Name of your Poppy!</label>
                </div>
                <div className="form-floating my-2 w-100">
                  <select
                    className="form-select text-center"
                    id="floatingSelect"
                    name="specie"
                    onChange={handleInputChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your pet specie:
                    </option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="fish">Fish</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                    <option value="farm">Farm animals</option>
                    <option value="exotic">Exotic</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="floatingSelect">Specie</label>
                </div>
                <div className="form-floating my-2 w-100">
                  <select
                    className="form-select text-center"
                    id="floatingSelect"
                    name="gender"
                    onChange={handleInputChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your pet genre:
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="floatingSelect">Genre</label>
                </div>
                <div className="form-floating my-2 w-100">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="birthdate"
                    value={pet.birthdate}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="date" className="form-label text-center">
                    Date of birth:
                  </label>
                </div>
                <div className="form-floating my-2 w-100">
                  <input
                    type="text"
                    className="form-control text-center"
                    id="floatingInput"
                    placeholder="Weight"
                    name="weight"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput">Weight [kg]</label>
                </div>
                <div className="form-floating my-2 w-100">
                  <input
                    type="text"
                    className="form-control text-center"
                    id="floatingInput"
                    placeholder="Race"
                    name="race"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput">Race</label>
                </div>
                <div className="form-floating my-2 w-100">
                  <input
                    type="text"
                    className="form-control text-center"
                    id="floatingInput"
                    placeholder="Emergency Phone"
                    name="emergency_phone"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput">Emergency Phone</label>
                </div>
                <div className="text-center my-1">
                  <button
                    className="btn btn-warning py-2 mx-auto rounded-pill"
                    type="submit"
                  >
                    Done!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Registerpet;
