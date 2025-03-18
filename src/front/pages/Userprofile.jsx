import React from "react";
import { useNavigate } from "react-router-dom";


const Userprofile = () => {

    const navigate = useNavigate();

  return (
    <div className="container my-5">
        <h1 className="text-center mb-4">Personal Information</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4 text-center mx-2">
                
                <img src="data:image/png;base64,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"
                 alt="Imagen de perfil" className="profile-img mb-3 col-5" id="profileImg" style={{ width: 300}}/>
                
                <input type="file" className="form-control mb-3" id="imageUpload" accept="image/*"/>
                
            </div>

            <div className="col-md-8 d-flex justify-content-around align-items-center mx-2">
                
                <form id="profileForm" className="row g-3">
                    <div className="mb-3 col-5">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Juan Pérez"/>
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">Principal Phone Number</label>
                        <input type="tel" className="form-control" id="phone" placeholder="000-000-00-00"/>
                    </div>
                    <div className="mb-3 col-5">
                        <label for="phone" className="form-label">Seconary Phone Number</label>
                        <input type="tel" className="form-control" id="phone" placeholder="000-000-00-00"/>
                    </div>
                    <div className="mb-3 col-5">
                        <label for="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" placeholder="30" />
                    </div>
                    <div className="mb-5 col-5">
                        <label for="location" className="form-label">Address</label>
                        <input type="text" className="form-control" id="location" placeholder="1234 Downtown AV, Apt 5, 25643"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ () => navigate("/DashboardUser")}>Update Changes</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Userprofile;