import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () =>{

    const navigate = useNavigate();

    return(
        <div>
            <div className="mt-5">
                <h1 className="text-center"> Login Usuario</h1>
            </div>
            <div className="col-4 mx-auto d-flex my-5">
                <div className="mt-5 col-6">
                    <img className="mb-4" src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png" alt="" width="150"/>
                </div>
                <div className="mt-3 col-6">
                    <div className="form-floating my-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating my-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={ () => navigate("/DashboardUser")}>Sign in</button>
                    <div>
                        <p className="mt-5 mb-3 text-body-secondary">No tienes cuenta? sé parte del club <Link to="/registeruse">aquí.</Link></p>
                        <p className="mb-3 text-body-secondary">Eres empresa? ofrece tus servicios <Link to="/registercom">aquí.</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;