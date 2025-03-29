import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";



const PetUpdate = () => {

    const [ person, setPerson ] = useState({
        phone: "",
        age: "",
        location: "",
        email: "",
        image: ""
    });
    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();
    const useNavigate = useNavigate();
      const [puppy, setPuppy] = useState({
        photo: "",
        emergency_phone: "",
        medical_history: "",
      });

    const updatePET = async (id) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pet/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${store.token}`
            },
              body: JSON.stringify(puppy)
          });
    
          if (!response.ok) {
            throw new Error("Failed to update pet");
          } console.error("Error updating pet:", error);
        } catch (error) {
            console.error("Error updating pet:", error);
        }
    };


    const navigate = useNavigate();


  return (
    <div className="container my-5">
          <h1 className="text-center mb-4">{store.role == "company" ? "Company" : "Mascota"} Information</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4 text-center mx-2">
                
                <img src={store.pet && store.pet?.image || "https://th.bing.com/th/id/OIP.Nz2KaAaoPwGwAGlOWTuOCAHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7" }
                 alt="Imagen de perfil" className="profile-img mb-3 col-5" id="profileImg" style={{ width: 300}}/>
                
                <input type="file" className="form-control mb-3" id="imageUpload" accept="image/*"/>
                
            </div>

            <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
                
                    
                        <div id="profileForm" className="row g-3">
                            <div className="mb-3 col-5">
                                <label for="name" className="form-label">
                                   Name
                                </label>
                                <input type="text" className="form-control" id="name" placeholder={store.pets && store.profile?.name || "Juan Perez"} />
                            </div>
                            <div className="mb-3 col-5">
                                <label for="phone" className="form-label">Principal Phone Number</label>
                                <input type="tel" className="form-control" id="phone" placeholder={store.profile && store.profile?.phone || "000-000-00-00" }/>
                            </div>
                            <div className="mb-3 col-5">
                                <label for="phone" className="form-label">Seconary Phone Number</label>
                                <input type="tel" className="form-control" id="phone" placeholder="000-000-00-00"/>
                            </div>
                            <div className="mb-3 col-5">
                                <label for="age" className="form-label">Age</label>
                                <input type="number" className="form-control" id="age" placeholder={store.profile && store.profile?.age || 25 } />
                            </div>
                            <div className="mb-5 col-5">
                                <label for="location" className="form-label">Address</label>
                                <input type="text" className="form-control" id="location" placeholder={store.profile && store.profile?.location || "1234 Downtown AV, Apt 5, 25643"}/>
                            </div>
                            <div className="mb-5 col-5">
                                <label for="location" className="form-label">Email</label>
                                <input type="text" className="form-control" id="location" placeholder={store.profile && store.profile?.email || "emailexample@gmail.com" } />
                            </div>
                    
                        <button type="submit" className="btn btn-primary" onClick={ () => updateUser(person)}>Update Changes</button>
                
                </div>
            </div>
        </div>
    </div>
  );
}

export default Userprofile;