
import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const Registercom = () => {

  const {store, dispatch} = useGlobalReducer();

  const [company, setCompany] = useState({
    name: "",
    name_company: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange  = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const register = async (company) => {
    if (company.password === company.confirm) {
      console.log("Company: ", company);

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data: ", data);

        alert("Company created successfully ✅");
      }

    } else {
      alert("Password and Confirm Password are different");
    }
  }

    return(
      <main className="col-4 form-signin m-auto">
        <div >
          <div className="d-flex justify-content-center">
            <img className="m-5" src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png" alt="" width="150"/>
            <h1 className="h3 m-5 my-auto fw-normal">Offer your services!!🎉</h1>
          </div>

          <div className="form-floating my-2 mx-5">
            <input type="text" className="form-control text-center" id="user_name" placeholder="User Name"
            onChange={handleInputChange} name="name"
            />
            <label htmlFor="floatingInput">User Name</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type="text" className="form-control text-center" id="name_company" placeholder="Company Name"
            onChange={handleInputChange} name="name_company" 
            />
            <label htmlFor="floatingInput">Company Name</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type="email" className="form-control text-center" id="email" placeholder="name@example.com"
            onChange={handleInputChange} name="email" 
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>          
          <div className="form-floating my-2 mx-5">
            <input type={!showPassword ? "password" : "text"} className="form-control text-center" id="password" placeholder="Password"
            onChange={handleInputChange} name="password" 
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type={!showPassword ? "password" : "text"} className="form-control text-center" id="confirm" placeholder="Password"
            onChange={handleInputChange} name="confirm" 
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>

          <div className="mx-auto text-end">
            <button className="btn btn-light py-2 mx-1" type="button"
            onClick={() => setShowPassword(!showPassword)}
            >
              <i className="fa-solid fa-eye"></i>
            </button>

            <button className="btn btn-primary py-2 me-5 w-25" type="submit"
            onClick={() => register(company)}
            >Sign in
            </button>
          </div>

          <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
        </div>
      </main>  

  );
};

export default Registercom;
