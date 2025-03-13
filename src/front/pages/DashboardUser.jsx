import { useState } from "react";

export const DashboardUser = () => {
  // Inicializa `pets` como un array de objetos
  const [pets, setPets] = useState([
    { id: 1, name: "Capy", hasPending: true, src: "https://i.pinimg.com/736x/64/a8/84/64a884b56b595ebe57a87fa387802916.jpg" },
    { id: 2, name: "Titan", hasPending: false, src: "https://i.pinimg.com/736x/56/37/21/5637217d86a44baf78f13af6dd4e6744.jpg" }
  ]);
  const [profesional, setProfesional] = useState([
    { id: 1, name: "PomPom", specialty: "Veterinarian and Cantones", phone: 1234567890, email: "popon@gmail.com", location: "Costa Rica, San José, San Pedro, a la par de la UCR", img: "https://i.pinimg.com/736x/0c/b7/8a/0cb78a0d81370df294a89459e4734a98.jpg"}]);

  return (
    <div className="" style={{background: "#EDF6F9"}}>
      {/** Card de pets */}
      <div className="card d-flex mt-3 " style={{ width: "60rem", margin: "auto" }}>
        <h5 className="card-header text-center" style={{background: "#006D77", color: "#EDF6F9"}}>Pets</h5>
        <div className="card-body " style={{background: "#FFFFFF"}}>
          <div className="d-flex flex-wrap gap-3" >
            {pets.map(pet => (
              <div key={pet.id} className="text-center position-relative">

                <button
                  style={{ border: "none", background: "none", padding: 0 }}
                >

                  <img
                    src={pet.src}
                    alt={pet.name}
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  {pet.hasPending && (
                    <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    </span>
                  )}
                </button>
                <h6 className="mt-2" style={{color: "#006D77"}}>{pet.name}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/** Termina Card */}

      {/** Recordatorios */}
      <h2 style={{color: "#006D77"}}>Reminders</h2>
      <div className="card text-center"
        style={{ width: "60rem", margin: "auto" }}>
        <h5 className="card-header" style={{background: "#83C5BE", color: "#EDF6F9"}}>Reminders</h5>
        <div className="card-body" style={{background: "#FFFFFF"}}>
          <p className="card-text" style={{color: "#006D77"}}>No tienes recordatorios pendientes.</p>
        </div>
      </div>
      {/** Termina Recordatorios */}

      {/** Profesionales cercanos */}
      <h2 style={{color: "#006D77"}}>Nearby professionals</h2>
      <div className="card d-flex text-center mt-3 " style={{ width: "20rem", margin: "auto" }}>
        <h5 className="card-header" style={{background: "#83C5BE", color: "#EDF6F9"}}>Nearby professionals</h5>
        <div className="card-body" style={{background: "#FFFFFF"}}>
          <div className=""> {/*info de profesional */}
            <p className="card-text border border-2 p-2" style={{color: "#006D77"}}>
            <img className ="rounded-circle"src="https://i.pinimg.com/736x/0c/b7/8a/0cb78a0d81370df294a89459e4734a98.jpg"
            style={{ width: "100px", height: "100px", objectFit: "cover" }} alt="" /> <br />
              
            <strong>Name:</strong> PomPom
            <br/>
            <strong>Specialty:</strong> Veterinarian and Cantones
            <br/>
            <strong>Phone:</strong> 1234567890
            <br/>
            <strong>Email:</strong> example@example.com
            <br/>
            <strong>Location:</strong> Costa Rica, San José, San Pedro, a la par de la UCR <br />
            <button className="btn mt-2" style={{background: "#E29578", color: "#EDF6F9"}}>Info?</button>
            </p>
          </div>
        </div>
      </div>
      {/** Termina profesionales cercanos */}
      {/** services */}
      <h2 style={{color: "#006D77"}}>Services</h2>
      <div className="card d-flex text-center mt-3 " style={{ width: "20rem", margin: "auto" }}>
        <h5 className="card-header" style={{background: "#83C5BE", color: "#EDF6F9"}}>Services</h5>
        <div className="card-body" style={{background: "#FFFFFF"}}>
          <div className=""> {/*info de profesional */}
            <p className="card-text border border-2 p-2" style={{color: "#006D77"}}>
            <strong>Service:</strong> Cantones
            
            <br/>
            <button className="btn mt-2" style={{background: "#E29578", color: "#EDF6F9"}}>Info?</button>
            </p>
          </div>
        </div>
        </div>
      {/** Termina services */}

    </div>
  );
};