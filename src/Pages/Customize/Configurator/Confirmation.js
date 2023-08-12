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
              <div key={index} className="mb-4">
                <h5>{part.name}</h5>
                <p>Color:  {part.color ? (
                  <span
                    className="color-display"
                    style={{ backgroundColor: part.color, width: "30px", height: "30px" }}
                  ></span>
                ) : (
                  <span>N/A</span>
                )}</p>
               
                <p>Texture:</p>
                {part.texture ? (
                  <p>
                    <img src={part.texture} alt="Selected Texture" style={{ maxWidth: "100px" }} />
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                {index !== selectedParts.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
