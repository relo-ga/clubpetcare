import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardUser = () => {
  // Hooks
  const [pets, setPets] = useState([
    { id: 1, name: "Capy", hasPending: true, src: "https://i.pinimg.com/736x/64/a8/84/64a884b56b595ebe57a87fa387802916.jpg" },
    { id: 2, name: "Titan", hasPending: false, src: "https://i.pinimg.com/736x/56/37/21/5637217d86a44baf78f13af6dd4e6744.jpg" }
  ]);

  const [profesional, setProfesional] = useState([
    { id: 1, name: "PomPom", specialty: "Veterinarian and Cantones", phone: 1234567890, email: "popon@gmail.com", location: "Costa Rica, San José, San Pedro, a la par de la UCR", img: "https://i.pinimg.com/736x/0c/b7/8a/0cb78a0d81370df294a89459e4734a98.jpg" }
  ]);

  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4" style={{ background: "#EDF6F9" }}>
      {/** Sección de Pets */}
      <div className="d-flex justify-content-center">
        <div className="card shadow" style={{ width: "40rem", height: "23rem" }}>
            <h5 className="card-header text-center" style={{ background: "#006D77", color: "#FFFFFF" }}>Pets</h5>
            <div className="card-body" style={{ background: "#FFFFFF" }}>
              <h1 className="text-center">
                <i className="fa-solid fa-paw" style={{ color: "#006D77" }}></i>
              </h1>
              <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                {pets.map(pet => (
                  <div key={pet.id} className="text-center position-relative">
                    <button
                      style={{ border: "none", background: "none"}}
                      onClick={() => navigate("/profilepet")}
                    >
                      <img
                        src={pet.src}
                        className="rounded-circle"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        alt={pet.name}
                      />
                      {pet.hasPending && (
                        <span className="position-absolute translate-middle p-2 bg-danger rounded-circle"></span>
                      )}
                    </button>
                    <h5 className="mt-2" style={{ color: "#006D77" }}>{pet.name}</h5>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 style={{ color: "#006D77" }}>¿Tienes un familiar nuevo?</h4>
                <button
                  className="btn rounded-pill"
                  style={{ background: "#E29578", color: "#FFFFFF" }}
                  onClick={() => navigate("/registercom")}
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
      <h5 className="card-header text-center" style={{ background: "#83C5BE", color: "#FFFFFF" }}>
        <i className="fa-solid fa-calendar-days me-2"></i>Recordatorios para hoy
      </h5>
      <div className="card-body" style={{ background: "#FFFFFF" }}>
        <div className="">

          {/* Recordatorio 1 */}
          <div className="d-flex align-items-center p-3">
            <div className="flex-shrink-0">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", background: "#83C5BE" }}>
                <i className="fa-solid fa-bell text-white"></i>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <strong style={{ color: "#006D77" }}>Vacunación para Capy</strong>
              <p className="mb-0 small text-muted">Llevar a Capy al veterinario para su vacuna anual.</p>
            </div>
          </div>
                <hr />
          {/* Recordatorio 2 */}
          <div className="d-flex align-items-center p-3">
            <div className="flex-shrink-0">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", background: "#83C5BE" }}>
                <i className="fa-solid fa-bell text-white"></i>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <strong style={{ color: "#006D77" }}>Corte de pelo para Titan</strong>
              <p className="mb-0 small text-muted">Reservar cita para el corte de pelo de Titan.</p>
            </div>
          </div>
                <hr />
          {/* Recordatorio 3 */}
          <div className="list-group-item d-flex align-items-center p-3">
            <div className="flex-shrink-0">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", background: "#83C5BE" }}>
                <i className="fa-solid fa-bell text-white"></i>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <strong style={{ color: "#006D77" }}>Comprar comida para mascotas</strong>
              <p className="mb-0 small text-muted">Comprar comida premium para Capy y Titan.</p>
            </div>
          </div>
        </div>

        
        <div className="d-flex justify-content-end mt-3">
          <a className="text-decoration-none" style={{ color: "#E29578" }}>
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
    <h2 style={{ color: "#006D77" }}>Nearby Professionals</h2>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">


      <div className="col">
        <div className="card h-100 shadow">
          <h5 className="card-header text-center" style={{ background: "#83C5BE", color: "#EDF6F9" }}>
            Nearby Professional
          </h5>
          <div className="card-body text-center" style={{ background: "#FFFFFF" }}>
            <img
              src="https://i.pinimg.com/736x/0c/b7/8a/0cb78a0d81370df294a89459e4734a98.jpg"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              alt="PomPom"
            />
            <p className="card-text" style={{ color: "#006D77" }}>
              <strong>Name:</strong> PomPom<br />
              <strong>Specialty:</strong> Veterinarian and Cantones<br />
              <strong>Phone:</strong> 1234567890<br />
              <strong>Email:</strong> example@gmail.com<br />
              <strong>Location:</strong> Costa Rica, San José, San Pedro
            </p>
            <button
              className="btn"
              style={{ background: "#E29578", color: "#EDF6F9" }}
              onClick={() => navigate("/veterinarios")}
            >
              Info
            </button>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 shadow">
          <h5 className="card-header text-center" style={{ background: "#83C5BE", color: "#EDF6F9" }}>
            Nearby Professional
          </h5>
          <div className="card-body text-center" style={{ background: "#FFFFFF" }}>
            <img
              src="https://i.pinimg.com/736x/56/37/21/5637217d86a44baf78f13af6dd4e6744.jpg"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              alt="Titan"
            />
            <p className="card-text" style={{ color: "#006D77" }}>
              <strong>Name:</strong> Dr. Titan<br />
              <strong>Specialty:</strong> Ser Feliz<br />
              <strong>Phone:</strong> 0987654321<br />
              <strong>Email:</strong> titan@gmail.com<br />
              <strong>Location:</strong> Costa Rica, San José, Curridabat
            </p>
            <button
              className="btn"
              style={{ background: "#E29578", color: "#EDF6F9" }}
              onClick={() => navigate("/veterinarios")}
            >
              Info?
            </button>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 shadow-sm">
          <h5 className="card-header text-center" style={{ background: "#83C5BE", color: "#EDF6F9" }}>
            Nearby Professional
          </h5>
          <div className="card-body text-center" style={{ background: "#FFFFFF" }}>
            <img
              src="https://i.pinimg.com/736x/64/a8/84/64a884b56b595ebe57a87fa387802916.jpg"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              alt="Capy"
            />
            <p className="card-text" style={{ color: "#006D77" }}>
              <strong>Name:</strong> Dr. Capy<br />
              <strong>Specialty:</strong> Aves<br />
              <strong>Phone:</strong> 1122334455<br />
              <strong>Email:</strong> capy@gmail.com<br />
              <strong>Location:</strong> Costa Rica, Heredia, San Pablo
            </p>
            <button
              className="btn"
              style={{ background: "#E29578", color: "#EDF6F9" }}
              onClick={() => navigate("/veterinarios")}
            >
              Info?
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      {/** Termina seccion de profesionales */}
    </div>
  );
};