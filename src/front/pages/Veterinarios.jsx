import React from "react";

const Veterinarios = () =>{

    return(
        <div>
            <div className="card mb-3 col-8 mx-auto">
                <div className="row g-0">
                    <div className="col-md-4 p-3 d-flex align-items-center">
                        <div>
                            <img src="https://www.clinicaveterinariapanchocavero.com/assets/img/logo.png" className="img-fluid rounded-start" alt="..."/>
                        </div>
                    </div>
                    <div className="col-md-8 p-3">
                        <div className="card-body">
                            <h5 className="card-title">Clínica Veterinaria Pancho Cavero</h5>
                            <p className="card-text">La Clínica Veterinaria Pancho Cavero inició sus actividades el 01 de Octubre del 2004. 
                                Sus fundadores, el Dr. Pancho Cavero y la Dra. Fiorella Cochella, decidieron ofrecer una propuesta médica innovadora, 
                                integral y de calidad.<br/>Quieres saber más? ingresa aquí</p>
                            <p className="card-text">Av. San Luis 2845, San Borja</p>
                            <p> 992 125 188 | 01 635 2172 <br/> Atención: Lunes a Sabado - 8 a.m. - 10 p.m. <br/>Domingos - 8 a.m. - 8 p.m.</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Veterinarios;