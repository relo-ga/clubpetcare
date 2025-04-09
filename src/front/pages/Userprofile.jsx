import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Userprofile = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState({
    photo: null,
    phone: "",
    secondary_phone: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setPerson((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setPerson((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", person.photo);
    formData.append("upload_preset", "ClubPetCare");

    try {
      const cloudName = "dqs8bd3ts";
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        alert("There was an error uploading the image ❌");
        return null;
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("There was an error uploading the image ❌");
      return null;
    }
  };

  const updateUser = async (person, id) => {
    try {
      const photoUrl = person.photo ? await uploadImage() : null;

      const userDataToUpdate = photoUrl
        ? { ...person, photo: photoUrl }
        : person;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user_profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(userDataToUpdate),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUserData = await response.json();
      console.log("Updated user data:", updatedUserData);
      alert("User updated successfully ✅");
    } catch (error) {
      console.error("Update failed:", error);
      alert("There was an error updating the user ❌");
    }
  };

  const getProfileImage = () => {
    if (person.photo) return URL.createObjectURL(person.photo);
    if (store.profile?.photo && !person.photo) return store.profile.photo;
    return "https://th.bing.com/th/id/OIP.Nz2KaAaoPwGwAGlOWTuOCAHaHa?w=193&h=193";
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 open-sans-body">
        {store.role === "user" ? "User" : "Personal"} Information
      </h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-4 text-center mx-2">
          <img
            src={getProfileImage()}
            alt="Imagen de perfil"
            className="profile-img mb-3 col-5"
            style={{ width: 300 }}
          />
          <input
            type="file"
            className="form-control mb-3 open-sans-body"
            accept="image/*"
            onChange={handleInputChange}
            name="photo"
          />
          <button
            className="btn btn-primary"
            onClick={() => setPerson({ ...person, photo: null })}
          >
            Clear Image
          </button>
        </div>

        <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
          <form id="profileForm" className="row g-3">
            <div className="mb-3 col-5">
              <label htmlFor="name" className="form-label open-sans-body">
                Name
              </label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="name"
                placeholder={store.profile?.name || "Juan Perez"}
                disabled
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="phone" className="form-label open-sans-body">
                Principal Phone Number
              </label>
              <input
                type="tel"
                className="form-control sour-gummy-head"
                id="phone"
                name="phone"
                onChange={handleInputChange}
                placeholder={store.profile?.phone || "000-000-00-00"}
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="secondary_phone" className="form-label open-sans-body">
                Secondary Phone Number
              </label>
              <input
                type="tel"
                className="form-control sour-gummy-head"
                id="secondary_phone"
                name="secondary_phone"
                onChange={handleInputChange}
                placeholder="000-000-00-00"
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="dob" className="form-label open-sans-body">
                Age
              </label>
              <input
                type="number"
                className="form-control sour-gummy-head"
                id="dob"
                name="dob"
                onChange={handleInputChange}
                placeholder={store.profile?.age || 25}
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="location" className="form-label open-sans-body">
                Address
              </label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="location"
                name="location"
                onChange={handleInputChange}
                placeholder={store.profile?.location || "1234 Downtown AV, Apt 5, 25643"}
              />
            </div>

            <div className="mb-3 col-5">
              <label htmlFor="email" className="form-label open-sans-body">
                Email
              </label>
              <input
                type="text"
                className="form-control sour-gummy-head"
                id="email"
                disabled
                placeholder={store.profile?.email || "emailexample@gmail.com"}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary open-sans-body"
              onClick={() => updateUser(person, id)}
            >
              Update Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
