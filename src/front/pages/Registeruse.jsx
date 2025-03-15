
import React, { useState } from "react";

const Registeruse = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

    return( 
      <main className="col-4 form-signin m-auto">
        <div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img className="m-1 mt-5" src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png" alt="" width="150" />
            <h1 className="h3 m-5 my-auto fw-normal">Be one of us 🙈</h1>
          </div>

          <div className="form-floating my-2 mx-5">
            <input type="text" className="form-control text-center" id="floatingInputName" placeholder="User Name" name="name"
              onChange={handleInputChange}
            />
            <label forhtml="floatingInput">User Name</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type="email" className="form-control text-center" id="floatingInputEmail" placeholder="name@example.com" name="email"
              onChange={handleInputChange}
            />
            <label forhtml="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type={!showPassword ? "password" : "text"} className="form-control text-center" id="floatingPassword" placeholder="Password" name="password"
              onChange={handleInputChange}
            />
            <label forhtml="floatingPassword">Password</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type={!showPassword ? "password" : "text"} className="form-control text-center" id="floatingConformPassword" placeholder="Password" name="confirm"
              onChange={handleInputChange}
            />
            <label forhtml="floatingPassword">Confirm Password</label>
          </div>
          
          <div className="mx-auto text-end">
            <button className="btn btn-light py-2 mx-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
            <button className="btn btn-primary py-2 me-5 w-25" type="submit"
              onClick={() => console.log(user)}
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
    );
};

export default Registeruse;