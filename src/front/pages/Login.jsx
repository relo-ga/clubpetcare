import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Login = () =>{

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [credentialsCompany, setCredentialsCompany] = useState({
        email: "",
        password: ""
    });

    const handleCrendentials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleCrendentialsCompany = (e) => {
        setCredentialsCompany({
            ...credentialsCompany,
            [e.target.name]: e.target.value
        });
    }

    // nos manda al home si ya estamos logueados
    useEffect(() => {
        if (store.token) {
            navigate("/");
        }
    }, [store.token]);

    const login = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: "update_token", payload: data.access_token });
                navigate("/dashboarduser");
            } else {
                alert("Credenciales incorrectas");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loginCompany = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/loginCompany", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentialsCompany)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: "update_tokenCompany", payload: data.access_token });
                navigate("/companyprofile");
            } else {
                alert("Credenciales incorrectas");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <div className="col-6 mx-auto mt-5">
                <h1 className="text-center"> Login</h1>
                
                <ul className="nav nav-pills nav-fill m-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-usuario-tab" data-bs-toggle="pill" 
                        data-bs-target="#pills-usuario" type="button" role="tab" aria-controls="pills-usuario" aria-selected="true">Usuario</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-empresa-tab" data-bs-toggle="pill" 
                        data-bs-target="#pills-empresa" type="button" role="tab" aria-controls="pills-empresa" aria-selected="false">Empresa</button>
                    </li>
                </ul>

                {/* Usuario */}
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-usuario" role="tabpanel" aria-labelledby="pills-usuario-tab" tabindex="0">
                        <div className="col-10 mx-auto d-flex my-5">
                            <div className="d-flex align-items-start col-7">
                                <img className="p-4 col-12" style={{width:"100%", height:"300px", objectFit:"cover"}} 
                                src="https://www.debate.com.mx/img/2018/10/20/dog-838281_1920.jpg?__scale=w:360,h:222,t:2,q:100" alt="" />
                            </div>
                            <div className="mt-3 col-5">
                                <div className="form-floating my-2">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        onChange={handleCrendentials} name="email" value={credentials.email}
                                    />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating my-2">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                        onChange={handleCrendentials} name="password" value={credentials.password}
                                    />
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <div className="form-check text-start my-3">
                                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <button className="btn btn-primary w-100 py-2" type="submit" onClick={() => login()}>Sign in</button>
                                <div>
                                    <p className="mt-5 mb-3 text-body-secondary">No tienes cuenta? sé parte del club <Link to="/registeruse">aquí.</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Empresa */}
                    <div className="tab-pane fade" id="pills-empresa" role="tabpanel" aria-labelledby="pills-empresa-tab" tabindex="0">
                        <div className="col-10 mx-auto d-flex my-5">
                            <div className="d-flex align-items-start col-7">
                                <img className="p-4 col-12" style={{width:"100%", height:"300px", objectFit:"cover"}} src="https://tvazteca.brightspotcdn.com/dims4/default/7cee31f/2147483647/strip/true/crop/1280x728+0+0/resize/968x551!/format/webp/quality/90/?url=http%3A%2F%2Ftv-azteca-brightspot.s3.amazonaws.com%2F50%2F5c%2F48bbd95a4528a7f5078f236b5df3%2Fveterinaria-publica-en-mexico.jpg"
                                    alt=""/>
                            </div>
                            <div className="mt-3 col-5">
                                <div className="form-floating my-2">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        onChange={handleCrendentialsCompany} name="email" value={credentialsCompany.email} 
                                     />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating my-2">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                        onChange={handleCrendentialsCompany} name="password" value={credentialsCompany.password}
                                    />
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <div className="form-check text-start my-3">
                                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <button className="btn btn-primary w-100 py-2" type="submit" onClick={() => loginCompany()}>Sign in</button>
                                <div>
                                    <p className="mt-5 mb-3 text-body-secondary">Eres empresa? ofrece tus servicios <Link to="/registercom">aquí.</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
export default Login;