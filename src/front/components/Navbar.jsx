import { Link } from "react-router-dom";

export const Navbar = () => {

	return (

		<nav className="navbar navbar-light" style={{ background: '#83C5BE' }}>
			<div className="container">

				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="navbar-brand mb-0 h1 text-white">
						ClubPetCare
					</span>
				</Link>

				<div className="d-flex align-items-center">
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
					<nav className="navbar">
						<div className="container-fluid">
							<a className="navbar-brand" href="#"></a>
							<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="offcanvas offcanvas-end text-dark" tabIndex="-1" style={{ background: "#83C5BE" }} id="offcanvasDarkNavbar">
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
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//   return (
//     <nav className="navbar navbar-light" style={{ background: "#83C5BE" }}>
//       <div className="container d-flex justify-content-between align-items-center">
//         {/* Logo a la izquierda */}
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="navbar-brand mb-0 h1 text-white">ClubPetCare</span>
//         </Link>

//         {/* Contenedor de botones y toggler a la derecha */}
//         <div className="d-flex align-items-center">
//           {/* Botón de Register */}
//           <Link to="/registeruse" className="me-2" style={{ textDecoration: "none" }}>
//             <button className="btn" style={{ background: "#FFDDD2" }}>
//               Register
//             </button>
//           </Link>

//           {/* Botón de Login */}
//           <Link to="/login" style={{ textDecoration: "none" }}>
//             <button className="btn me-2" style={{ background: "#EDF6F9" }}>
//               Login
//             </button>
//           </Link>

//           {/* Botón Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasDarkNavbar"
//             aria-controls="offcanvasDarkNavbar"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//         </div>
//       </div>

//       {/* Offcanvas Navbar */}
//       <div
//         className="offcanvas offcanvas-end text-bg-dark"
//         tabIndex="-1"
//         id="offcanvasDarkNavbar"
//         aria-labelledby="offcanvasDarkNavbarLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
//             ClubPetCare
//           </h5>
//           <button
//             type="button"
//             className="btn-close btn-close-white"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="#">
//                 Home
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Link
//               </a>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle"
//                 href="#"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Dropdown
//               </a>
//               <ul className="dropdown-menu dropdown-menu-dark">
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Action
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Another action
//                   </a>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Something else here
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };
