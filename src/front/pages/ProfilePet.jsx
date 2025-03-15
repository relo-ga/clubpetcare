import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePet = () => {

    const navigate = useNavigate();

    return(
        <div className="py-4" style={{ backgroundColor: "#FFDDD2" }}>
            <div className="my-3 col-5 mx-auto rounded-4 pb-2" style={{ backgroundColor: "#fff" }}>
                <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Datos de la Mascota</h2>
                </div>
                <div className="row g-0 m-5 d-flex align-items-center justify-content-between">
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="">
                            <img src="https://images3.memedroid.com/images/UPLOADED537/665c8560a1300.jpeg" style={{width:"300px"}} className="img-fluid rounded-pill" alt="..."/>
                        </div>
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="card-body">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td><h5 className="card-title">Nombre: </h5></td>
                                        <td><p>Buck Minster</p></td>
                                    </tr>
                                    <tr>
                                        <td><h5 className="card-title">Peso: </h5></td>
                                        <td><p>15 kg</p></td>
                                    </tr>
                                    <tr>
                                        <td><h5 className="card-title">Altura: </h5></td>
                                        <td><p>60 cm</p></td>
                                    </tr>
                                    <tr>
                                        <td><h5 className="card-title">Raza: </h5></td>
                                        <td><p>1/2 can, 1/2 comadreja</p></td>
                                    </tr>
                                    <tr>
                                        <td><h5 className="card-title">Edad: </h5></td>
                                        <td><p>3 años</p></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center">
                                <button type="button" class="btn btn-outline-dark rounded-pill" onClick={ () => navigate("/registerpet")}>
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-3 col-5 mx-auto rounded-4 pb-2" style={{ backgroundColor: "#fff" }}>
            <div className="pt-4 pb-1 rounded-top-4" style={{ backgroundColor: "#83C5BE" }}>
                    <h2 className="text-center" style={{color:"#006D77"}}>Historial Médico</h2>
                </div>
                <div className="row g-0 m-5 d-flex align-items-center justify-content-center">
                    <div className="col-md-6 d-flex flex-column align-items-center">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td><h5 className="card-title">Vacunas: </h5></td>
                                    <td><p>Al día.</p></td>
                                </tr>
                                <tr>
                                    <td><h5 className="card-title">Alergias: </h5></td>
                                    <td><p>Ninguno.</p></td>
                                </tr>
                                <tr>
                                    <td><h5 className="card-title">Enfermedades: </h5></td>
                                    <td><p>Ninguno.</p></td>
                                </tr>
                                <tr>
                                    <td><h5 className="card-title">Operaciones: </h5></td>
                                    <td><p>Ninguno.</p></td>
                                </tr>
                                <tr>
                                    <td><h5 className="card-title">Descargar Historial</h5></td>
                                    <td className="d-flex align-items-center"><p>Historial Buck Minster</p><i class="fa-solid fa-download"></i></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-outline-dark rounded-pill" onClick={ () => navigate("/registerpet")}>
                            <i class="fa-solid fa-plus"></i>
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

        </div>
    );
}

export default ProfilePet;