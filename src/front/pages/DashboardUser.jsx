import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./colors.css"; // Importa el archivo de colores

export const DashboardUser = () => {
  // Hooks
  const [pets, setPets] = useState([

  ]);

  const [profesional, setProfesional] = useState([
    { id: 1, name: "PomPom", specialty: "Veterinarian and Cantones", phone: 1234567890, email: "popon@gmail.com", location: "Costa Rica, San José, San Pedro, a la par de la UCR", img: "https://i.pinimg.com/736x/0c/b7/8a/0cb78a0d81370df294a89459e4734a98.jpg" },
    { id: 2, name: "Dr. Titan", specialty: "Ser Feliz", phone: 9876543210, email: "titan@gmail.com", location: "Costa Rica, San José, Curridabat", img: "https://i.pinimg.com/736x/56/37/21/5637217d86a44baf78f13af6dd4e6744.jpg" },
    { id: 3, name: "Dr. Capy", specialty: "Aves", phone: 1122334455, email: "capy@gmail.com", location: "Costa Rica, Heredia, San Pablo", img: "https://i.pinimg.com/736x/64/a8/84/64a884b56b595ebe57a87fa387802916.jpg" }
  ]);

  const navigate = useNavigate();
  /** Sufrimiento de conectar backend */
 
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/pets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }
    , []);

  return (
    <div className="container-fluid p-4 background">
      {/** Sección de Pets */}
      <div className="d-flex justify-content-center">
        <div className="card shadow" style={{ width: "40rem", height: "23rem" }}>
          <h5 className="card-header text-center primary text-white">Pets</h5>
          <div className="card-body">
            <h1 className="text-center">
              <i className="fa-solid fa-paw text-primary-css"></i>
            </h1>
            <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
              {pets.map(pet => (
                <div key={pet.id} className="text-center position-relative">
                  <button
                    style={{ border: "none", background: "none" }}
                    onClick={() => navigate("/profilepet")}
                  >
                    <img
                      src={pet.photo || "https://images3.memedroid.com/images/UPLOADED537/665c8560a1300.jpeg"}
                      className="rounded-circle"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      alt={pet.name}
                    />
                    {pet.hasPending && (
                      <span className="position-absolute translate-middle p-2 bg-danger rounded-circle"></span>
                    )}
                  </button>
                  <h5 className="mt-2 text-primary-css">{pet.name}</h5>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="text-primary-css">¿Tienes un familiar nuevo?</h4>
              <button
                className="btn rounded-pill accent text-white"
                onClick={() => navigate("/registerpet")}
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/** Sección de Recordatorios */}
      <div className="row justify-content-center mt-5">
        <div className="" style={{ width: "60rem" }}>
          <div className="card shadow">
            <h5 className="card-header text-center secondary text-white">
              <i className="fa-solid fa-calendar-days me-2"></i>Recordatorios para hoy
            </h5>
            <div className="card-body">
              <div className="">
                {/* Recordatorio 1 */}
                <div className="d-flex align-items-center p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center secondary" style={{ width: "40px", height: "40px" }}>
                      <i className="fa-solid fa-bell text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <strong className="text-primary-css">Vacunación para Capy</strong>
                    <p className="mb-0 small text-muted">Llevar a Capy al veterinario para su vacuna anual.</p>
                  </div>
                </div>
                <hr />
                {/* Recordatorio 2 */}
                <div className="d-flex align-items-center p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center secondary" style={{ width: "40px", height: "40px" }}>
                      <i className="fa-solid fa-bell text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <strong className="text-primary-css">Corte de pelo para Titan</strong>
                    <p className="mb-0 small text-muted">Reservar cita para el corte de pelo de Titan.</p>
                  </div>
                </div>
                <hr />
                {/* Recordatorio 3 */}
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center secondary" style={{ width: "40px", height: "40px" }}>
                      <i className="fa-solid fa-bell text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <strong className="text-primary-css">Comprar comida para mascotas</strong>
                    <p className="mb-0 small text-muted">Comprar comida premium para Capy y Titan.</p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <a className="text-decoration-none accent">
                  Ver todos los recordatorios <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Seccion de Profesionales Cercanos */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-10 col-md-12">
          <h2 className="text-primary-css">Nearby Professionals</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {profesional.map(pro => (
              <div className="col" key={pro.id}>
                <div className="card h-100 shadow">
                  <h5 className="card-header text-center secondary text-white">
                    Nearby Professional
                  </h5>
                  <div className="card-body text-center">
                    <img
                      src={pro.img}
                      className="rounded-circle mb-3"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      alt={pro.name}
                    />
                    <p className="card-text text-primary-css">
                      <strong>Name:</strong> {pro.name}<br />
                      <strong>Specialty:</strong> {pro.specialty}<br />
                      <strong>Phone:</strong> {pro.phone}<br />
                      <strong>Email:</strong> {pro.email}<br />
                      <strong>Location:</strong> {pro.location}
                    </p>
                    <button
                      className="btn accent text-white"
                      onClick={() => navigate("/veterinarios")}
                    >
                      Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};