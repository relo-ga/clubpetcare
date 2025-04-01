import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CompanyUpdate = () => {

const { store, dispatch } = useGlobalReducer();
//const { id } = store._id;
const [ Business , setBusiness ] = useState({
    photo: "",
    phone: "",
    location: "",
    description: "",
    });

const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", Business.photo);
    formData.append('upload_preset', 'ClubPetCare');    
}

    return(
        <div className="container my-5">
            <h1 className="text-center mb-4">{store.role == "user" ? "user" : "Personal"} Information</h1>
          <div className="d-flex justify-content-center">
              <div className="col-md-4 text-center mx-2">
                  
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Imagen de perfil" className="profile-img mb-3 col-5" id="profileImg" style={{ width: 300}}/>
                  <input type="file" className="form-control mb-3" id="imageUpload" accept="image/*"
                  name="photo"
              />
              <button className="btn btn-primary" id="cameraBtn">
                <span className="camera-text">Clear Image</span>
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
                            Principal Phone Number
                        </label>
                        <input type="tel" className="form-control" id="phone" placeholder="000-000-00-00"
                        />
                    </div>
                
                    <button type="submit" className="btn btn-primary" onClick={ () => updatecompany(person, id)}>Update Changes</button>
                
                    </div>
              </div>
          </div>
      </div>
    );
  }

export default CompanyUpdate;