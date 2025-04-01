import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CompanyUpdate = () => {

    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [ business , setBusiness ] = useState({
        photo: null,
        phone: "",
        location: "",
        description: "",
        });

    const handleInputChange = (e) => {
        if (e.target.name === "photo") {
            const file = e.target.files[0];
            setBusiness({
                ...business,
                photo: file
            });
        } else {
            setBusiness({
                ...business,
                [e.target.name]: e.target.value
            });
        }
    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", business.photo);
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

    const updatecompany = async (business, id) => {
        try {

            const photoUrl = business.photo ? await uploadImage() : null;

            const userDataToupdate = photoUrl 
            ? { ...business, photo: photoUrl }
            : business;

            const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/company_profile/${id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${store.token}`,
                },
                body: JSON.stringify(userDataToupdate)
                }
            );
            if (!response.ok) {
                throw new Error("Error updating company");
            }

            const updateCompanyData =await response.json();
            console.log("Company updated successfully", updateCompanyData);
            alert("Company updated successfully ✅");
        
            } catch (error) {
                console.log("update failed:", error)
                alert("There was an error updating the company ❌");
            }
        };
        

    const getProfileImage = () => {
        if(business.photo) {
            return URL.createObjectURL(business.photo);
        }
        if (store.profile && store.profile.photo && !business.photo) {
            return store.profile.photo;
        }
        return "https://res.cloudinary.com/dqs8bd3ts/image/upload/v1696345012/ClubPetCare/DefaultProfileImage.png";
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
              <button className="btn btn-primary" id="cameraBtn">
                <span className="camera-text">Clear mage</span>
              </button>
                  
              </div>
  
              <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
                  
                      
                    <div id="profileForm" className="row g-3">
                    <div className="mb-3 col-5">
                        <label for="name" className="form-label">
                            Name
                        </label>
                        <input type="text" className="form-control" id="name" placeholder="Juan Perez" disabled/>
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">
                            Company name
                        </label>
                        <input type="tel" className="form-control" id="phone" placeholder="Hogar dulce hogar" disabled/>
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">
                            Email
                        </label>
                        <input type="tel" className="form-control" id="phone" placeholder="hogardulce@gmail.com" disabled/>
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">
                            Location
                        </label>
                        <input type="tel" className="form-control" id="phone" placeholder={store.profile && store.profile?.location || "P. Sherman, 42 Wallaby Way, Sídney"}
                        onChange={handleInputChange} name="location"
                        />
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">
                            Phone Number
                        </label>
                        <input type="tel" className="form-control" id="phone" placeholder={store.profile && store.profile?.phone || "000-000-0000"}
                        onChange={handleInputChange} name="phone"
                        />
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">
                            Description
                        </label>
                        <textarea type="tel" className="form-control" id="phone" placeholder={store.profile && store.profile?.description || "Hogar dulce hogar"}
                        onChange={handleInputChange} name="description"
                        />
                    </div>
                
                    <button type="submit" className="btn btn-primary" onClick={ () => updatecompany(business, id)}>Update Changes</button>
                
                    </div>
              </div>
          </div>
      </div>
    );
  }

export default CompanyUpdate;