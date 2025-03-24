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
			dispatch({ type: "update_profile", payload: data });
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProfileCompany = async () => {
		try {
			const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/meCompany", {
				headers: {
					Authorization: `Bearer ${store.token}`
				}
			});
			const data = await response.json();
			dispatch({ type: "update_profileCompany", payload: data });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (store.token) {
			fetchProfile();
			fetchProfileCompany();
		}
	}, [store.token]);

	return (

		<nav className="navbar navbar-light" style={{ background: '#83C5BE' }}>
			<div className="container">

				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="navbar-brand mb-0 h1 text-white">
						ClubPetCare
					</span>
				</Link>

				<div className="d-flex align-items-center">
					{
						!store.token && <>
							<Link to="/registeruse" className="me-2" style={{ textDecoration: 'none' }}>
								<button className="btn" style={{ background: "#FFDDD2" }}>
									Register
								</button>
							</Link>
							<Link to="/login" style={{ textDecoration: 'none' }}>
								<button className="btn"
									style={{ background: "#EDF6F9" }}
								>
									Login
								</button>
							</Link>
						</>
					}
					{
						store.token && <>
							<p className="m-0 me-2 fw-bold text-black p-2">
								{store.profile?.name}
								{store.profileCompany?.name_company}
							</p>
							<Link to="/profile" className="me-2" style={{ textDecoration: 'none' }}>
								<button className="btn" style={{ background: "#FFDDD2" }}>
									Profile
								</button>
							</Link>

							<button className="btn"
								style={{ background: "#EDF6F9" }}
								onClick={() => dispatch({ type: "update_token", payload: null })}
							>
								Logout
							</button>
						</>
					}
					<nav className="navbar">
						<div className="container-fluid">
							<a className="navbar-brand" href="#"></a>
							<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="offcanvas offcanvas-end text-white" tabIndex="-1" style={{ background: "#83C5BE" }} id="offcanvasDarkNavbar">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">ClubPetCare</h5>
									<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
								</div>
								<div className="offcanvas-body">
									<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
										<li className="nav-item">
											<a className="nav-link" aria-current="page" href="#">Perfil</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item dropdown">
											<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
												Dropdown
											</a>
											<ul className="dropdown-menu dropdown-menu-dark">
												<li><a className="dropdown-item" href="#">Action</a></li>
												<li><a className="dropdown-item" href="#">Another action</a></li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li><a className="dropdown-item" href="#">Something else here</a></li>
											</ul>
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
