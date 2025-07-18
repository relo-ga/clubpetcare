import React, { useState } from "react";
import { Calendar } from "../components/Calendar";

const CardServicesProf = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [pets, setPets] = useState([]);
    const [loadingPets, setLoadingPets] = useState(false);

    const handleBookClick = async () => {
        try {
            setLoadingPets(true);
            // Get user's pets
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pets`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error loading pets');
            const petsData = await response.json();
            setPets(petsData);

            setShowModal(true);
        } catch (error) {
            console.error("Error loading pets:", error);
            alert("Error loading your pets. Please try again.");
        } finally {
            setLoadingPets(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBooking = (bookingData) => {
        console.log("Booking details:", {
            ...bookingData,
            serviceId: props.id // Add service ID from props
        });
        alert("Booking successful");
        setShowModal(false);

        // Here you can make the fetch call to save the booking
        // saveBooking(bookingData);
    };

    return (
        <div className="col-lg-3 col-md-6 mb-4">
            {/* Booking modal - Pass companyId from props */}
            <Calendar
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleBooking}
                pets={pets}
                companyId={props.id_company}
                serviceId={props.id}
            />

            <div className="card h-100 shadow-sm border-0">
                <div className="p-3 d-flex justify-content-center mx-auto" style={{ height: "150px" }}>
                    <img
                        src={props.image || "https://placehold.co/600x400"}
                        className="card-img-top img-fluid rounded"
                        alt={props.name}
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: 'cover',
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                        }}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x400";
                        }}
                    />
                </div>
                <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title mb-3 text-center sour-gummy-head">{props.name}</h5>
                    <div className="text-wrap mb-3 text-center flex-grow-1">
                        <p className="text-muted open-sans-body">{props.description}</p>
                    </div>
                    <div className="d-flex justify-content-center mt-auto">
                        <button
                            type="button"
                            className="btn btn-primary px-4 sour-gummy-head"
                            onClick={handleBookClick}
                            disabled={loadingPets}
                            style={{
                                backgroundColor: "#006D77",
                                border: "none",
                                borderRadius: "20px",
                                padding: "8px 20px"
                            }}
                        >
                            {loadingPets ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </>
                            ) : "Book Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardServicesProf;