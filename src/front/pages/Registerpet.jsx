import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Registerpet = () => {
    const navigate = useNavigate();

    const { store } = useGlobalReducer();

    const [pet, setPet] = useState({
        name: "",
        gender: "",
        photo: "",
        medical_history: "",
        race: "",
        emergency_phone: "",
        birthdate: "",
        weight: "",
    });

    const handleInputChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        });
    };

    const register = async (pet) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/createpet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${store.token}`
                },
                body: JSON.stringify(pet)
            });

            const data = await response.json();
            console.log("Data: ", data);

            if (!response.ok) {
                console.error("Failed to register pet");
                alert("Failed to register pet ❌");
            } else {
                alert("Pet created successfully ✅");
                navigate("/"); // Redirect to home or another page after successful registration
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while registering the pet ❌");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(pet);
    };

    return (
        <div className="d-flex flex-column">
            {/* <div className="mx-auto my-5">
                <button className="btn btn-warning py-2 mx-1 rounded-pill" type="submit">
                    <i className="fa-solid fa-plus"></i>

                    onClick={() => upload}
                </button>
            </div> */}

            <div className="d-flex justify-content-around fs-1 col-5 border mx-auto rounded my-4 p-3" style={{ backgroundColor: "#FFDDD2" }}>
                <div className="mx-2">
                    <i className="fa-solid fa-cat"></i>
                </div>
                <h1>Pet Information</h1>
                <div className="mx-2">
                    <i className="fa-solid fa-dog"></i>
                </div>
            </div>

            <div className="col-5 border mx-auto rounded my-4 p-3" style={{ backgroundColor: "#FFDDD2" }}>
                <div className="form-floating my-2 col-7 m-auto">
                    <input
                        type="text"
                        className="form-control text-center"
                        id="floatingInput"
                        placeholder="Pet Name"
                        name="name"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Name of your Poppy!</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <select
                        className="form-select text-center"
                        id="floatingSelect"
                        name="specie"
                        onChange={handleInputChange}
                        defaultValue=""
                    >
                        <option value="" disabled>Select your pet specie:</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="fish">Fish</option>
                        <option value="bird">Bird</option>
                        <option value="reptile">Reptile</option>
                        <option value="farm">Farm animals</option>
                        <option value="exotic">Exotic</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="floatingSelect">Specie</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <select
                        className="form-select text-center"
                        id="floatingSelect"
                        name="gender"
                        onChange={handleInputChange}
                        defaultValue=""
                    >
                        <option value="" disabled>Select your pet genre:</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="floatingSelect">Genre</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="birthdate"
                        value={pet.birthdate}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="date" className="form-label text-center">Date of birth:</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input
                        type="text"
                        className="form-control text-center"
                        id="floatingInput"
                        placeholder="Weight"
                        name="weight"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Weight [kg]</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input
                        type="text"
                        className="form-control text-center"
                        id="floatingInput"
                        placeholder="Race"
                        name="race"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Race</label>
                </div>
                <div className="form-floating my-2 col-7 m-auto">
                    <input
                        type="text"
                        className="form-control text-center"
                        id="floatingInput"
                        placeholder="Emergency Phone"
                        name="emergency_phone"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Emergency Phone</label>
                </div>
                <div className="text-center my-1">
                    <button
                        className="btn btn-warning py-2 mx-auto rounded-pill"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Done!
                    </button>
                </div>
            </div>
            <br />
        </div>
    );
};

export default Registerpet;