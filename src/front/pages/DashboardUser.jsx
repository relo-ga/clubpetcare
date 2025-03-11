import { useState } from "react";

export const DashboardUser = () => {
  // Inicializa `pets` como un array de objetos
  const [pets, setPets] = useState([
    { id: 1, name: "Capy", src: "https://i.pinimg.com/736x/64/a8/84/64a884b56b595ebe57a87fa387802916.jpg" },
    { id: 2, name: "Titan", src: "https://i.pinimg.com/736x/56/37/21/5637217d86a44baf78f13af6dd4e6744.jpg" }
  ]);

  return (
    <div>
      <h2>Dashboard User</h2>
      <div className="card text-center">
        <h5 className="card-header">Pets</h5>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3"> {/* Contenedor flexible para las mascotas */}
            {pets.map(pet => (
              <div key={pet.id} className="text-center">
                <img
                  src={pet.src}
                  alt={pet.name}
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }} /* Ajuste de la imagen */
                />
                <h6 className="mt-2">{pet.name}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};