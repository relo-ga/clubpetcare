import React from "react";

import { useNavigate } from "react-router-dom";

const Registerpet = () => {

    const navigate = useNavigate();

    return( <div className="d-flex flex-column">
            <div className="mx-auto my-5">
                <img className="mx-auto rounded-circle" src="https://u4d2z7k9.delivery.rocketcdn.me/wp-content/uploads/2023/05/Untitled-683-%C3%97-1024px-1024-%C3%97-683px-15.jpg" alt="" width="300"/>
                <button className="btn btn-warning py-2 mx-1 rounded-pill" type="submit">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div >
            
            <div className="d-flex justify-content-around fs-1 col-5 border mx-auto rounded my-4 p-3" style={{ backgroundColor: "#FFDDD2", }}>
                <div className="mx-2">
                    <i class="fa-solid fa-cat"></i>
                </div>
                <h1>Pet Information</h1>
                <div className="mx-2">
                    <i class="fa-solid fa-dog"></i>
                </div>
            </div>
            
            <div className="col-5 border mx-auto rounded my-4 p-3" style={{ backgroundColor: "#FFDDD2", }}>
                <div className="form-floating my-2 col-7 m-auto">
                    <input type="text" className="form-control text-center" id="floatingInput" placeholder="User Name"/>
                    <label for="floatingInput">Name of your Poppy!</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input type="text" className="form-control text-center" id="floatingInput" placeholder="User Name"/>
                    <label for="floatingInput">Type of Specie</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input type="text" className="form-control text-center" id="floatingInput" placeholder="User Name"/>
                    <label for="floatingInput">Type of Gender</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input type="text" className="form-control text-center" id="floatingInput" placeholder="User Name"/>
                    <label for="floatingInput">How old is it?</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input type="text" className="form-control text-center" id="floatingInput" placeholder="User Name"/>
                    <label for="floatingInput">Weight</label>
                </div>
                <div className="text-center my-1">
                    <button className="btn btn-warning py-2 mx-auto rounded-pill" type="submit"
                        onClick={ () => navigate("/profilepet")}>
                        Done!
                    </button>
                </div>
            </div>
            <br />

        </div>
    );
};

export default Registerpet;