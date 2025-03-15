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
				<div className="ml-auto">
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
				</div>
			</div>
		</nav>
	);
};