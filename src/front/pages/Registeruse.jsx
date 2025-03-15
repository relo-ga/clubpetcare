
import React from "react";

const Registeruse = () => {
    return( 
      <main className="col-4 form-signin m-auto">
        <form >
          <div className="d-flex justify-content-center">
            <img className="m-5" src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png" alt="" width="150"/>
            <h1 className="h3 m-5 my-auto fw-normal">Be One of our Members!!!</h1>
          </div>

          <div className="form-floating my-2 mx-5">
            <input type="text" className="form-control text-center" id="floatingInput" placeholder="User Name"/>
            <label for="floatingInput">User Name</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type="email" className="form-control text-center" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type="password" className="form-control text-center" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>
          <div className="form-floating my-2 mx-5">
            <input type="password" className="form-control text-center" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Confirm Password</label>
          </div>
          
          <div className="mx-auto text-end">
            <button className="btn btn-light py-2 mx-1" type="submit">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button className="btn btn-primary py-2 me-5 w-25" type="submit">Sign in</button>
          </div>

          <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
        </form>
      </main>
    );
};

export default Registeruse;