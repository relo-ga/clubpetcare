
import React from "react";

const Registercom = () => {
  return (
    <div className="">     
      <main className="form-signin w-100 mx-auto">
        <form >
          <div className="d-flex justify-content-center">
            <img className="m-5 w-" src="" alt="" width="72" height="57"/>
            <h1 className="h3 m-5 w- fw-normal">Offer your services!!</h1>
          </div>

          <div className="form-floating my-2 mx-5 w-">
            <input type="text" className="form-control" id="floatingInput" placeholder="User Name"/>
            <label for="floatingInput">User Name</label>
          </div>
          <div className="form-floating my-2 mx-5 w-">
            <input type="text" className="form-control" id="floatingInput" placeholder="Company Name"/>
            <label for="floatingInput">Company Name</label>
          </div>
          <div className="form-floating my-2 mx-5 w-">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
          </div>
          
          <div className="form-floating my-2 mx-5 w-">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>
          <div className="form-floating my-2 mx-5 w-">
            <input type="password" className="form-control text-center" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Confirm Password</label>
          </div>

          <div className="mx-auto text-end">
            <button className="btn btn-primary py-2 mx-5" type="submit">Sign in</button>
          </div>

          <p className="mt-5 w- mb-3 text-body-secondary">© 2025</p>
        </form>
      </main>
    </div>       

  );
};

export default Registercom;
