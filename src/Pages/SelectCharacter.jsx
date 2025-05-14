import React from "react";

const SelectCharacter = () => {
    return (
        <div
        className="container-fluid d-flex flex-column align-items-center"
        style={{ minHeight: "100vh", marginTop: "60px", padding: "0" }}
        >
        <div className="row w-100 bg-primary" style={{ display: "flex", alignItems: "center", padding: "20px", margin: "0" }}>
            <div className="col-md-6 d-flex flex-column align-items-center">
                <h2 className="text-center mb-4 text-light">Game Information</h2>
                <img
                src={"https://placehold.co/300x200"} // Placeholder image URL
                alt="Game Placeholder"
                className="mb-4 rounded-4"
                />
            </div>
            <div className="col-md-6 d-flex justify-content-between" style={{ gap: "15px" }}>
                <div>
                    <h3 className="text-light">Game Name</h3>
                    <p className="text-light">Rage Mode</p>
                </div>
                <div>
                    <h3 className="text-light">Created On</h3>
                    <p className="text-light">January 1, 2023</p>
                </div>
                <div>
                    <h3 className="text-light">Description</h3>
                    <p className="text-light">A thrilling action game where you unleash your rage!</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SelectCharacter;