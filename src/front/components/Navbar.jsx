import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const fetchProfile = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/me", {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      });
      const data = await response.json();
      dispatch({ type: "update_profile", payload: data.profile });
      dispatch({ type: "update_role", payload: data.role });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (store.token) {
      fetchProfile();
    }
  }, [store.token]);

  return (
    <nav className="navbar navbar-light" style={{ background: '#83C5BE' }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
          {/* <img
            src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-42f8-51f7-954a-acf1d2c30f4a/raw?se=2025-04-08T02%3A08%3A27Z&sp=r&sv=2024-08-04&sr=b&scid=453167b7-6cb0-5c11-b0f6-e6e32feff455&skoid=acefdf70-07fd-4bd5-a167-a4a9b137d163&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-07T12%3A35%3A05Z&ske=2025-04-08T12%3A35%3A05Z&sks=b&skv=2024-08-04&sig=yNGmHpg8q6e442UC9btHAzvprLHdaQrygee4Uajtr6A%3D"  // Reemplaza con la ruta correcta de tu imagen
            alt="ClubPetCare Logo"
            className="me-2"
            style={{
              height: '40px',
              width: 'auto',
              maxWidth: '120px',  // Ancho máximo para evitar que se vea pixelado
              objectFit: 'contain'  // Mantiene las proporciones
            }}
            onError={(e) => {
              e.target.src = 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-42f8-51f7-954a-acf1d2c30f4a/raw?se=2025-04-08T02%3A08%3A27Z&sp=r&sv=2024-08-04&sr=b&scid=453167b7-6cb0-5c11-b0f6-e6e32feff455&skoid=acefdf70-07fd-4bd5-a167-a4a9b137d163&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-07T12%3A35%3A05Z&ske=2025-04-08T12%3A35%3A05Z&sks=b&skv=2024-08-04&sig=yNGmHpg8q6e442UC9btHAzvprLHdaQrygee4Uajtr6A%3D';  // Imagen de respaldo
              e.target.alt = 'Logo alternativo';
            }}
          /> */}
          <span className="sour-gummy-head text-white fs-4">
            ClubPetCare
          </span>
        </Link>

        <div className="d-flex align-items-center">
          {!store.token ? (
            <>
              <Link to="/registeruse" className="me-2" style={{ textDecoration: 'none' }}>
                <button className="btn sour-gummy-head" style={{ background: "#FFDDD2" }}>
                  Register
                </button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn sour-gummy-head" style={{ background: "#EDF6F9" }}>
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <p className="m-0 me-2 fw-bold text-black p-2 open-sans-body">
                {store.profile?.name || store.profile?.name_company}
              </p>
              {store.role == "user" && (
                <Link to="/dashboarduser" className="me-2" style={{ textDecoration: 'none' }}>
                  <button className="btn sour-gummy-head" style={{ background: "#FFDDD2" }}>
                    Dashboard
                  </button>
                </Link>
              )}
              {store.role == "company" && (
                <Link to="/companyprofile" className="me-2" style={{ textDecoration: 'none' }}>
                  <button className="btn sour-gummy-head" style={{ background: "#FFDDD2" }}>
                    Profile
                  </button>
                </Link>
              )}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button
                  className="btn sour-gummy-head"
                  style={{ background: "#EDF6F9" }}
                  onClick={() => dispatch({ type: "update_token", payload: null })}
                >
                  Logout
                </button>
              </Link>
            </>
          )}
          <nav className="navbar">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="offcanvas offcanvas-end text-white" tabIndex="-1" style={{ background: "#83C5BE" }} id="offcanvasDarkNavbar">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title sour-gummy-head" id="offcanvasDarkNavbarLabel">ClubPetCare</h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      {store.token && (
                        <p className="m-0 me-2 fw-bold text-black p-2 open-sans-body">
                          {store.profile?.name || store.profile?.name_company}
                        </p>
                      )}
                    </li>
                    <li className="nav-item">
                      <Link to="/" style={{ textDecoration: 'none' }}><p className="m-0 me-2 fw-bold text-black p-2 sour-gummy-head" data-bs-dismiss="offcanvas">Home</p></Link>
                    </li>
                    <li className="nav-item">
                      {store.role == "user" && (
                        <Link to="/dashboarduser" style={{ textDecoration: 'none' }}>
                          <p className="m-0 me-2 fw-bold text-black p-2 sour-gummy-head" data-bs-dismiss="offcanvas">Dashboard</p>
                        </Link>
                      )}
                    </li>
                    <li className="nav-item">
                      {store.token && store.role == "user" && (
                        <Link to={"/userprofile/" + store?.profile?.id} className="me-2" style={{ textDecoration: 'none' }}>
                          <p className="m-0 me-2 fw-bold text-black p-2 sour-gummy-head" data-bs-dismiss="offcanvas">Profile</p>
                        </Link>
                      )}
                      {store.token && store.role == "company" && (
                        <Link to="/companyprofile" className="me-2" style={{ textDecoration: 'none' }}>
                          <p className="m-0 me-2 fw-bold text-black p-2 sour-gummy-head" data-bs-dismiss="offcanvas">Profile</p>
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};