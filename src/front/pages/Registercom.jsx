
import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";


const Registercom = () => {

  const navigate = useNavigate();

  const { store, dispatch } = useGlobalReducer();

  const [company, setCompany] = useState({
    name: "",
    name_company: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
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
        dispatch({ type: "update_token", payload: data.access_token });
        dispatch({ type: "update_profile", payload: data.company });
        navigate("/CompanyProfile");
      }

    } else {
      alert("Password and Confirm Password are different");
    }
  }

  return (
    <main className="col-4 form-signin m-auto">
      <div >
        <div className="d-flex justify-content-center">
          <img className="m-5" src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png" alt="" width="150" />
          <h1 className="h3 m-4 my-auto fw-normal sour-gummy-head">Offer your services!!🎉</h1>
        </div>

        <div className="form-floating my-2 mx-5">
          <input type="text" className="form-control text-center open-sans-body" id="user_name" placeholder="User Name"
            onChange={handleInputChange} name="name"
          />
          <label className="open-sans-body" htmlFor="floatingInput">User Name</label>
        </div>
        <div className="form-floating my-2 mx-5">
          <input type="text" className="form-control text-center" id="name_company" placeholder="Company Name"
            onChange={handleInputChange} name="name_company"
          />
          <label className="open-sans-body" htmlFor="floatingInput">Company Name</label>
        </div>
        <div className="form-floating my-2 mx-5">
          <input type="email" className="form-control text-center" id="email" placeholder="name@example.com"
            onChange={handleInputChange} name="email"
          />
          <label className="open-sans-body" htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating my-2 mx-5">
          <input type={!showPassword ? "password" : "text"} className="form-control text-center" id="password" placeholder="Password"
            onChange={handleInputChange} name="password"
          />
          <label className="open-sans-body" htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating my-2 mx-5">
          <input type={!showPassword ? "password" : "text"} className="form-control text-center" id="confirm" placeholder="Password"
            onChange={handleInputChange} name="confirm"
          />
          <label className="open-sans-body" htmlFor="floatingPassword">Confirm Password</label>
        </div>

        <div className="mx-auto text-end">
          <button className="btn btn-light py-2 mx-1" type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className="fa-solid fa-eye"></i>
          </button>

          <button className="btn btn-primary py-2 me-5 w-25 sour-gummy-head" type="submit"
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
