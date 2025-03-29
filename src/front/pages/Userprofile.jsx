import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";



const Userprofile = () => {
  
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

    const [ person, setPerson ] = useState({
      photo: null,
        phone: "",
      secondary_phone: "",
        location: "",
    });


  const handleInputChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setPerson({
        ...person,
        photo: file
      });
    } else {
      setPerson({
        ...person,
        [e.target.name]: e.target.value
      });
    }
  }

  const uploadImage = async () => {

    const formData = new FormData();
    formData.append("file", person.photo);
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
              "Authorization": `Bearer ${store.token}`
            },
            body: JSON.stringify(userDataToUpdate)
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        const updatedUserData = await response.json();
        console.log("Updated user data:", updatedUserData);
        alert("User updated successfully ✅");

      } catch (error) {
        console.error("Update failed:", error);
        alert("There was an error updating the user ❌");
      }
    };


  const getProfileImage = () => {
    if (person.photo) {
      return URL.createObjectURL(person.photo);
    }
    if (store.profile && store.profile.photo && !person.photo) {
      return store.profile.photo;
    }
    return "https://th.bing.com/th/id/OIP.Nz2KaAaoPwGwAGlOWTuOCAHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  }
    return(
      <div className="container my-5">
          <h1 className="text-center mb-4">{store.role == "user" ? "user" : "Personal"} Information</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4 text-center mx-2">
                
            <img src={getProfileImage()}
                 alt="Imagen de perfil" className="profile-img mb-3 col-5" id="profileImg" style={{ width: 300}}/>
                <input type="file" className="form-control mb-3" id="imageUpload" accept="image/*"
              onChange={handleInputChange} name="photo"
            />
            <button className="btn btn-primary" id="cameraBtn" onClick={() => setPerson({ ...person, photo: null })}>
              <span className="camera-text">Clear Image</span>
            </button>
                
            </div>

            <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
                
                    
                        <div id="profileForm" className="row g-3">
                            <div className="mb-3 col-5">
                                <label for="name" className="form-label">
                                   Name
                                </label>
                                <input type="text" className="form-control" id="name" placeholder={store.profile && store.profile?.name || "Juan Perez"} disabled/>
                            </div>
                            <div className="mb-3 col-5">
                                <label for="phone" className="form-label">Principal Phone Number</label>
                                <input type="tel" className="form-control" id="phone" placeholder={store.profile && store.profile?.phone || "000-000-00-00" }
                                onChange={handleInputChange} name="phone"
                                />
                            </div>
                            <div className="mb-3 col-5">
                                <label for="phone" className="form-label">Seconary Phone Number</label>
                                <input type="tel" className="form-control" id="phone" placeholder="000-000-00-00"
                                onChange={handleInputChange} name="secondary_phone"
                                />
                            </div>
                            <div className="mb-3 col-5">
                                <label for="age" className="form-label">Age</label>
                                <input type="number" className="form-control" id="age" placeholder={store.profile && store.profile?.age || 25 } 
                                onChange={handleInputChange} name="age"
                                />
                            </div>
                            <div className="mb-5 col-5">
                                <label for="location" className="form-label">Address</label>
                                <input type="text" className="form-control" id="location" placeholder={store.profile && store.profile?.location || "1234 Downtown AV, Apt 5, 25643"}
                                onChange={handleInputChange} name="location"
                                />
                            </div>
                            <div className="mb-5 col-5">
                                <label for="location" className="form-label">Email</label>
                                <input type="text" className="form-control" id="location" placeholder={store.profile && store.profile?.email || "emailexample@gmail.com" } disabled/>
                            </div>
                    
                        <button type="submit" className="btn btn-primary" onClick={ () => updateUser(person, id)}>Update Changes</button>
                
                </div>
            </div>
        </div>
    </div>
  );
}

export default Userprofile;

//useEffect(() => {
  // Route protection or Route Guard
  //if (store.token && store.role != "user") {
  //naigate("/login");
  //}
//}, [store.role]);
