import React from "react";

const Confirmation = ({
  price,
  estimatedShippingTime,
  readyBy,
  selectedParts, // Array containing selected parts with their color and texture information
  selectedSize, // The selected size
}) => {
  return (
    <div className="container confirmation-page">
      <h1 className="mt-4">Order Confirmation</h1>
      <div className="row">
        <div className="col-md-6">
          <p className="h5 mt-3">Price: ${price}</p>
          <p>Estimated Shipping Time: {estimatedShippingTime}</p>
          <p>Expected to be Ready By: {readyBy}</p>
          <p className="h5 mt-4">Selected Size: {selectedSize || "N/A"}</p>
          <p className="h5 mt-4">Thank you for your order!</p>
        </div>
        <div className="col-md-6">
          <div className="mt-4">
            <h2>Selected Parts</h2>
            {selectedParts.map((part, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Part: {part.name}</h5>
                  <p className="card-text">Color:</p>
                  {part.color ? (
                    <div
                      className="color-display"
                      style={{ backgroundColor: part.color, width: "30px", height: "30px" }}
                    ></div>
                  ) : (
                    <p className="card-text">N/A</p>
                  )}
                  <p className="card-text">Texture:</p>
                  {part.texture ? (
                    <p className="card-text">
                      <img src={part.texture} alt="Selected Texture" style={{ maxWidth: "100px" }} />
                    </p>
                  ) : (
                    <p className="card-text">N/A</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
