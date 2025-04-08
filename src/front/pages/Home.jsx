// import React, { useEffect } from "react"
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import "./Home.css";
// import { useNavigate } from "react-router-dom";

// export const Home = () => {

// 	const { store, dispatch } = useGlobalReducer();

// 	const navigate = useNavigate();


// 	const loadMessage = async () => {
// 		try {
// 			const backendUrl = import.meta.env.VITE_BACKEND_URL

// 			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

// 			const response = await fetch(backendUrl + "/api/hello")
// 			const data = await response.json()

// 			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

// 			return data

// 		} catch (error) {
// 			if (error.message) throw new Error(
// 				`Could not fetch the message from the backend.
// 				Please check if the backend is running and the backend port is public.`
// 			);
// 		}

// 	}

// 	useEffect(() => {
// 		loadMessage()
// 	}, [])

// 	return (<div className="clubpetcare-home">
// 		{/* Sección Hero */}
// 		<div className="hero-section py-5">
// 			<div className="container">
// 				<div className="row align-items-center min-vh-75 py-4 py-md-5">
// 					<div className="col-lg-6 mb-4 mb-lg-0">
// 						<h1 className="display-4 fw-bold mb-3 open-sans-body">Tu mascota merece lo mejor.</h1>
// 						<p className="lead mb-4 sour-gummy-head">Servicios veterinarios y de cuidado de calidad para tus compañeros peludos.</p>
// 						<div className="d-flex flex-column flex-sm-row gap-3 mt-4">
// 							<button
// 								className="btn btn-primary btn-lg open-sans-body"
// 								onClick={() => {
// 									if (store.token) {
// 										navigate("/DashboardUser");
// 									} else {
// 										navigate("/login");
// 									}
// 								}}
// 							>
// 								Reservar Cita
// 							</button>
// 							<button className="btn btn-outline-secondary btn-lg open-sans-body"
// 								onClick={() => {
// 									if (store.token) {
// 										navigate("/DashboardUser");
// 									} else {
// 										navigate("/registeruse");
// 									}
// 								}}
// 							>Conocer más</button>
// 						</div>
// 					</div>
// 					<div className="col-lg-6">
// 						<div className="img-container position-relative" style={{ height: "675px", maxHeight: "60vh" }}>
// 							<img src="https://plus.unsplash.com/premium_photo-1677181729027-a7873c1f6cb5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// 								alt="Mascota feliz"
// 								className="img-fluid rounded shadow w-100 h-100"
// 								style={{ objectFit: "cover" }}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 		{/* Sección de Servicios */}
// 		<div className="services-section py-5">
// 			<div className="container">
// 				<h2 className="text-center mb-5 open-sans-body">Nuestros Servicios</h2>
// 				<div className="row g-4">
// 					<div className="col-md-4">
// 						<div className="service-card">
// 							<div className="service-icon">
// 								<i className="bi bi-heart-pulse"></i>
// 							</div>
// 							<h3 className="open-sans-body">Asistencia Veterinaria</h3>
// 							<p className="open-sans-body sour-gummy-head">Atención médica profesional para mantener a tu mascota saludable. Consultas, vacunas y tratamientos.</p>
// 							<a href="#" className="service-link open-sans-body"
// 								onClick={() => {
// 									if (store.token) {
// 										navigate("/DashboardUser");
// 									} else {
// 										navigate("/registeruse");
// 									}
// 								}}
// 							>Más información</a>
// 						</div>
// 					</div>
// 					<div className="col-md-4">
// 						<div className="service-card">
// 							<div className="service-icon">
// 								<i className="bi bi-scissors"></i>
// 							</div>
// 							<h3 className="open-sans-body">Peluquería y Baños</h3>
// 							<p className="sour-gummy-head">Servicios de belleza y limpieza para que tu mascota luzca y se sienta increíble. Cortes personalizados.</p>
// 							<a href="#" className="service-link open-sans-body"
// 								onClick={() => {
// 									if (store.token) {
// 										navigate("/DashboardUser");
// 									} else {
// 										navigate("/registeruse");
// 									}
// 								}}>Más información</a>
// 						</div>
// 					</div>
// 					<div className="col-md-4">
// 						<div className="service-card">
// 							<div className="service-icon">
// 								<i className="bi bi-bicycle"></i>
// 							</div>
// 							<h3 className="open-sans-body">Paseos</h3>
// 							<p className="sour-gummy-head">Ejercicio y diversión garantizada con nuestros paseadores profesionales. Horarios flexibles.</p>
// 							<a href="#" className="service-link open-sans-body"
// 								onClick={() => {
// 									if (store.token) {
// 										navigate("/DashboardUser");
// 									} else {
// 										navigate("/registeruse");
// 									}
// 								}}
// 							>Más información</a>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 		{/* Sección Por qué elegirnos */}
// 		<div className="why-us-section py-5">
// 			<div className="container">
// 				<div className="row align-items-center">
// 					<div className="col-lg-6">
// 						<img src="https://plus.unsplash.com/premium_photo-1661916447474-235409b19e16?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Equipo veterinario" className="img-fluid rounded shadow" />
// 					</div>
// 					<div className="col-lg-6">
// 						<h2 className="open-sans-body">¿Por qué elegir ClubPetCare?</h2>
// 						<ul className="why-us-list">
// 							<li className="sour-gummy-head"><i className="bi bi-check-circle"></i> Personal certificado y con experiencia</li>
// 							<li className="sour-gummy-head"><i className="bi bi-check-circle"></i> Instalaciones modernas y seguras</li>
// 							<li className="sour-gummy-head"><i className="bi bi-check-circle"></i> Atención personalizada para cada mascota</li>
// 							<li className="sour-gummy-head"><i className="bi bi-check-circle"></i> Precios accesibles y programas de membresía</li>
// 							<li className="sour-gummy-head"><i className="bi bi-check-circle"></i> Servicio de emergencia 24/7</li>
// 						</ul>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 		{/* Sección de Testimonios */}
// 		<div className="testimonials-section py-5">
// 			<div className="container">
// 				<h2 className="text-center mb-5 open-sans-body">Lo que dicen nuestros clientes</h2>
// 				<div className="row g-4">
// 					<div className="col-md-4">
// 						<div className="testimonial-card">
// 							<div className="testimonial-content">
// 								<p className="sour-gummy-head">"El equipo de ClubPetCare es excepcional. Mi perro Max siempre sale feliz después de su visita al peluquero."</p>
// 							</div>
// 							<div className="testimonial-author">
// 								<img src="https://i.pravatar.cc/60?img=1" alt="Cliente" className="rounded-circle" />
// 								<div>
// 									<h5 className="open-sans-body">Ana García</h5>
// 									<small>Dueña de Max</small>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="col-md-4">
// 						<div className="testimonial-card">
// 							<div className="testimonial-content">
// 								<p className="sour-gummy-head">"Los veterinarios son muy profesionales y atentos. Han cuidado de mi gata Luna desde que era una bebé."</p>
// 							</div>
// 							<div className="testimonial-author">
// 								<img src="https://i.pravatar.cc/60?img=2" alt="Cliente" className="rounded-circle" />
// 								<div>
// 									<h5 className="open-sans-body">Carlos Rodríguez</h5>
// 									<small>Dueño de Luna</small>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="col-md-4">
// 						<div className="testimonial-card">
// 							<div className="testimonial-content">
// 								<p className="sour-gummy-head">"El servicio de paseos es fantástico. Mi perrito ahora tiene más energía y está mucho más feliz."</p>
// 							</div>
// 							<div className="testimonial-author">
// 								<img src="https://i.pravatar.cc/60?img=3" alt="Cliente" className="rounded-circle" />
// 								<div>
// 									<h5 className="open-sans-body">Laura Méndez</h5>
// 									<small>Dueña de Rocky</small>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 		{/* Sección de Contacto */}
// 		<div className="contact-section py-5">
// 			<div className="container">
// 				<div className="row g-4">
// 					<div className="col-lg-6">
// 						<h2 className="open-sans-body">Contáctanos</h2>
// 						<p className="lead sour-gummy-head">Estamos aquí para ayudarte con cualquier pregunta sobre nuestros servicios.</p>
// 						<div className="contact-info">
// 							<p className="sour-gummy-head"><i className="bi bi-geo-alt"></i> Av. Principal #123, Ciudad</p>
// 							<p className="sour-gummy-head"><i className="bi bi-telephone"></i> +123 456 7890</p>
// 							<p className="sour-gummy-head"><i className="bi bi-envelope"></i> info@clubpetcare.com</p>
// 						</div>
// 						<div className="social-links mt-4">
// 							<a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
// 							<a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
// 							<a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
// 						</div>
// 					</div>
// 					<div className="col-lg-6">
// 						<form className="contact-form">
// 							<div className="mb-3">
// 								<input type="text" className="form-control open-sans-body" placeholder="Nombre completo" />
// 							</div>
// 							<div className="mb-3">
// 								<input type="email" className="form-control open-sans-body" placeholder="Correo electrónico" />
// 							</div>
// 							<div className="mb-3">
// 								<input type="tel" className="form-control open-sans-body" placeholder="Teléfono" />
// 							</div>
// 							<div className="mb-3">
// 								<select className="form-select open-sans-body">
// 									<option selected>Selecciona un servicio</option>
// 									<option>Asistencia Veterinaria</option>
// 									<option>Peluquería y Baños</option>
// 									<option>Paseos</option>
// 								</select>
// 							</div>
// 							<div className="mb-3">
// 								<textarea className="form-control open-sans-body" rows="4" placeholder="Mensaje"></textarea>
// 							</div>
// 							<button type="submit" className="btn btn-primary btn-lg w-100 open-sans-body"
// 							onClick={() => alert("Mensaje enviado")}
// 							>Enviar mensaje</button>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// 	);
// }; 

import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	const navigate = useNavigate();

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}
	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="clubpetcare-home">
			{/* Hero Section */}
			<div className="hero-section py-5">
				<div className="container">
					<div className="row align-items-center min-vh-75 py-4 py-md-5">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<h1 className="display-4 fw-bold mb-3 open-sans-body">Your pet deserves the best.</h1>
							<p className="lead mb-4 sour-gummy-head">High-quality veterinary and pet care services for your furry companions.</p>
							<div className="d-flex flex-column flex-sm-row gap-3 mt-4">
								<button
									className="btn btn-primary btn-lg open-sans-body"
									onClick={() => {
										if (store.token) {
											navigate("/DashboardUser");
										} else {
											navigate("/login");
										}
									}}
								>
									Book Appointment
								</button>
								<button className="btn btn-outline-secondary btn-lg open-sans-body"
									onClick={() => {
										if (store.token) {
											navigate("/DashboardUser");
										} else {
											navigate("/registeruse");
										}
									}}
								>
									Learn More
								</button>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="img-container position-relative" style={{ height: "675px", maxHeight: "60vh" }}>
								<img 
									src="https://plus.unsplash.com/premium_photo-1677181729027-a7873c1f6cb5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Happy pet"
									className="img-fluid rounded shadow w-100 h-100"
									style={{ objectFit: "cover" }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Services Section */}
			<div className="services-section py-5">
				<div className="container">
					<h2 className="text-center mb-5 open-sans-body">Our Services</h2>
					<div className="row g-4">
						<div className="col-md-4">
							<div className="service-card">
								<div className="service-icon">
									<i className="bi bi-heart-pulse"></i>
								</div>
								<h3 className="open-sans-body">Veterinary Assistance</h3>
								<p className="open-sans-body sour-gummy-head">
									Professional medical care to keep your pet healthy. Consultations, vaccines, and treatments.
								</p>
								<a href="#" className="service-link open-sans-body"
									onClick={() => {
										if (store.token) {
											navigate("/DashboardUser");
										} else {
											navigate("/registeruse");
										}
									}}
								>
									Learn More
								</a>
							</div>
						</div>
						<div className="col-md-4">
							<div className="service-card">
								<div className="service-icon">
									<i className="bi bi-scissors"></i>
								</div>
								<h3 className="open-sans-body">Grooming & Bathing</h3>
								<p className="sour-gummy-head">
									Beauty and cleaning services to make your pet look and feel amazing. Customized cuts.
								</p>
								<a href="#" className="service-link open-sans-body"
									onClick={() => {
										if (store.token) {
											navigate("/DashboardUser");
										} else {
											navigate("/registeruse");
										}
									}}
								>
									Learn More
								</a>
							</div>
						</div>
						<div className="col-md-4">
							<div className="service-card">
								<div className="service-icon">
									<i className="bi bi-bicycle"></i>
								</div>
								<h3 className="open-sans-body">Dog Walking</h3>
								<p className="sour-gummy-head">
									Guaranteed exercise and fun with our professional walkers. Flexible schedules.
								</p>
								<a href="#" className="service-link open-sans-body"
									onClick={() => {
										if (store.token) {
											navigate("/DashboardUser");
										} else {
											navigate("/registeruse");
										}
									}}
								>
									Learn More
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Why Choose Us Section */}
			<div className="why-us-section py-5">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<img 
								src="https://plus.unsplash.com/premium_photo-1661916447474-235409b19e16?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
								alt="Veterinary team" 
								className="img-fluid rounded shadow" 
							/>
						</div>
						<div className="col-lg-6">
							<h2 className="open-sans-body">Why Choose ClubPetCare?</h2>
							<ul className="why-us-list">
								<li className="sour-gummy-head">
									<i className="bi bi-check-circle"></i> Certified and experienced staff
								</li>
								<li className="sour-gummy-head">
									<i className="bi bi-check-circle"></i> Modern and safe facilities
								</li>
								<li className="sour-gummy-head">
									<i className="bi bi-check-circle"></i> Personalized attention for every pet
								</li>
								<li className="sour-gummy-head">
									<i className="bi bi-check-circle"></i> Affordable prices and membership plans
								</li>
								<li className="sour-gummy-head">
									<i className="bi bi-check-circle"></i> 24/7 emergency service
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Testimonials Section */}
			<div className="testimonials-section py-5">
				<div className="container">
					<h2 className="text-center mb-5 open-sans-body">What Our Clients Say</h2>
					<div className="row g-4">
						<div className="col-md-4">
							<div className="testimonial-card">
								<div className="testimonial-content">
									<p className="sour-gummy-head">
										"ClubPetCare's team is exceptional. My dog Max always leaves happy after his grooming appointment."
									</p>
								</div>
								<div className="testimonial-author">
									<img src="https://i.pravatar.cc/60?img=1" alt="Client" className="rounded-circle" />
									<div>
										<h5 className="open-sans-body">Ana García</h5>
										<small>Max's Owner</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="testimonial-card">
								<div className="testimonial-content">
									<p className="sour-gummy-head">
										"The veterinarians are very professional and caring. They have looked after my cat Luna since she was a kitten."
									</p>
								</div>
								<div className="testimonial-author">
									<img src="https://i.pravatar.cc/60?img=2" alt="Client" className="rounded-circle" />
									<div>
										<h5 className="open-sans-body">Carlos Rodríguez</h5>
										<small>Luna's Owner</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="testimonial-card">
								<div className="testimonial-content">
									<p className="sour-gummy-head">
										"The walking service is fantastic. My dog now has more energy and is much happier."
									</p>
								</div>
								<div className="testimonial-author">
									<img src="https://i.pravatar.cc/60?img=3" alt="Client" className="rounded-circle" />
									<div>
										<h5 className="open-sans-body">Laura Méndez</h5>
										<small>Rocky's Owner</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Contact Section */}
			<div className="contact-section py-5">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-6">
							<h2 className="open-sans-body">Contact Us</h2>
							<p className="lead sour-gummy-head">
								We are here to help you with any questions about our services.
							</p>
							<div className="contact-info">
								<p className="sour-gummy-head">
									<i className="bi bi-geo-alt"></i> Main Ave #123, City
								</p>
								<p className="sour-gummy-head">
									<i className="bi bi-telephone"></i> +123 456 7890
								</p>
								<p className="sour-gummy-head">
									<i className="bi bi-envelope"></i> info@clubpetcare.com
								</p>
							</div>
							<div className="social-links mt-4">
								<a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
								<a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
								<a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
							</div>
						</div>
						<div className="col-lg-6">
							<form className="contact-form">
								<div className="mb-3">
									<input type="text" className="form-control open-sans-body" placeholder="Full Name" />
								</div>
								<div className="mb-3">
									<input type="email" className="form-control open-sans-body" placeholder="Email" />
								</div>
								<div className="mb-3">
									<input type="tel" className="form-control open-sans-body" placeholder="Phone" />
								</div>
								<div className="mb-3">
									<select className="form-select open-sans-body">
										<option selected>Select a service</option>
										<option>Veterinary Assistance</option>
										<option>Grooming & Bathing</option>
										<option>Dog Walking</option>
									</select>
								</div>
								<div className="mb-3">
									<textarea className="form-control open-sans-body" rows="4" placeholder="Message"></textarea>
								</div>
								<button 
									type="submit" 
									className="btn btn-primary btn-lg w-100 open-sans-body"
									onClick={() => alert("Message sent")}
								>
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
