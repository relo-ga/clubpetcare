import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ProfilePet = () => {
  
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el id de la mascota desde la URL
  const { store, dispatch } = useGlobalReducer();
  const [pet, setPet] = useState(null); // Estado  para almacenar los datos de la mascota
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchPet = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pet/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pet");
      }

      const data = await response.json();
      setPet(data); // Actualiza el estado local con los datos de la mascota
      dispatch({ type: "pet_info", payload: data });
    } catch (error) {
      console.error("Error fetching pet:", error);
      setError("Error al cargar la mascota"); // Establece un mensaje de error
    } finally {
      setLoading(false); // Finaliza la carga, incluso si hay un error
    }
  };


  useEffect(() => {
    if (id) {
      fetchPet(id); // Llama a fetchPet con el id de la mascota
    }
  }, [id]); // Elimina store.token de las dependencias

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <div>{error}</div>; // Muestra un mensaje de error si ocurre un problema
  }

  if (!pet) {
    return <div>No se encontró la mascota.</div>; // Muestra un mensaje si no hay datos de la mascota
  }

  return (
    <div className="py-4" style={{ backgroundColor: "#FFDDD2" }}>
      {/* Renderiza la información de la mascota aquí */}
      <div className="my-3 col-5 mx-auto rounded-4 pb-2" style={{ backgroundColor: "#fff" }}>
        <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
          <h2 className="text-center" style={{ color: "#006D77" }}>Datos de la Mascota</h2>
        </div>
        <div className="row g-0 m-5 d-flex align-items-center justify-content-between">
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <img src={pet.photo || "https://images3.memedroid.com/images/UPLOADED537/665c8560a1300.jpeg"}
                   style={{ width: "300px" }}
                   className="img-fluid rounded-pill"
                   alt={pet.name} />
            </div>
          </div>
          <div className="col-md-6 p-3">
            <div className="card-body">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><h5 className="card-title">Nombre: </h5></td>
                    <td><p>{pet.name}</p></td>
                  </tr>
                  <tr>
                    <td><h5 className="card-title">Género: </h5></td>
                    <td><p>{pet.gender}</p></td>
                  </tr>
                  <tr>
                    <td><h5 className="card-title">Raza: </h5></td>
                    <td><p>{pet.race}</p></td>
                  </tr>
                  <tr>
                    <td><h5 className="card-title">Especie: </h5></td>
                    <td><p>{pet.specie}</p></td>
                  </tr>
                  <tr>
                    <td><h5 className="card-title">Teléfono de emergencia: </h5></td>
                    <td><p>{pet.emergency_phone}</p></td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-dark rounded-pill" onClick={() => navigate("/registerpet")}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Historial Médico */}
      <div className="my-3 col-5 mx-auto rounded-4 pb-2" style={{ backgroundColor: "#fff" }}>
        <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
          <h2 className="text-center" style={{ color: "#006D77" }}>Historial Médico</h2>
        </div>
        <div className="row g-0 m-5 d-flex align-items-center justify-content-center">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td><h5 className="card-title">Historial Médico: </h5></td>
                  <td><p>{pet.medical_history}</p></td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-outline-dark rounded-pill" onClick={() => navigate("/registerpet")}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="my-3 col-5 mx-auto rounded-4 pb-2" style={{ backgroundColor: "#fff" }}>
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Servicios Reservados</h2>
                </div>
                <div className="row g-0 m-5 d-flex align-items-center justify-content-center">
                    <div className="col-md-8 p-3">
                        <div className="d-flex text-body-secondary pt-3">
                            <i className="fa-solid fa-bone me-3"></i>
                            <p className="pb-3 mb-0 small lh-sm border-bottom">
                            <strong className="d-block text-gray-dark">@username</strong>
                            Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
                            </p>
                        </div>
                        <div className="d-flex text-body-secondary pt-3">
                            <i className="fa-solid fa-bone me-3"></i>
                            <p className="pb-3 mb-0 small lh-sm border-bottom">
                            <strong className="d-block text-gray-dark">@username</strong>
                            Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
                            </p>
                        </div>
                        <div className="d-flex text-body-secondary pt-3">
                            <i className="fa-solid fa-bone me-3"></i>
                            <p className="pb-3 mb-0 small lh-sm border-bottom">
                            <strong className="d-block text-gray-dark">@username</strong>
                            Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
                            </p>
                        </div>
                    </div>
                </div>


            </div>
    </div>);
};

export default ProfilePet;