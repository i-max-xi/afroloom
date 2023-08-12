import React from "react";


const Confirmation = ({
  price,
  estimatedShippingTime,
  readyBy,
  selectedParts, // Array containing selected parts with their color and texture information
  selectedSize, // The selected size
}) => {

    const handlePrintClick = () => {
        // Use window.print() to trigger the browser's print dialog
        window.print();
      };

      const handleFormSubmit = async () => {
        try {
          const formData = {
            price,
            estimatedShippingTime,
            readyBy,
            selectedParts,
            selectedSize,
          };
    
          const response = await fetch("https://formspree.io/f/xrgwpakw", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert("Order confirmed. Thank you!");
          } else {
            alert("Failed to confirm order. Please try again.");
          }
        } catch (error) {
          console.error("Error submitting the form:", error);
          alert("An error occurred while confirming the order. Please try again later.");
        }
      };

  return (
    <div className="container confirmation-page">
      <h1 className="mt-4">Order Confirmation</h1>
      <div className="row">
        <div className="col-md-6">
          <p className="h5 mt-3 MB-5">
            CONVERTED 3D INTO IMAGE WILL BE HERE...
          </p>
          <p className="h5 mt-4">Selected Size: {selectedSize || "N/A"}</p>
          <p className="h5 mt-3">Price: ${price}</p>
          <p>Estimated Shipping Time: {estimatedShippingTime}</p>
          <p>Expected to be Ready By: {readyBy}</p>
        </div>
        <div className="col-md-6">
          <div className="mt-4">
            <h2>Information On Parts</h2>
            {selectedParts.map((part, index) => (
              <div key={index} className="mb-4">
                <h5>{part.name}</h5>
                <p>
                  Color:{" "}
                  {part.color ? (
                    <span
                      className="color-display"
                      style={{
                        backgroundColor: part.color,
                        width: "30px",
                        height: "30px",
                      }}
                    ></span>
                  ) : (
                    <span>N/A</span>
                  )}
                </p>

                <p>Texture:</p>
                {part.texture ? (
                  <p>
                    <img
                      src={part.texture}
                      alt="Selected Texture"
                      style={{ maxWidth: "70px" }}
                    />
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
      <div className="container justify-content-center">
        <div className="d-flex">
          <button className="btn btn-outline-success" onClick={handlePrintClick}>Download Copy</button>
          <button className="btn btn-success" onClick={handleFormSubmit}>
            Confirm Order
          </button>
        </div>

        <p className="h5 mt-4">Thank you for your order!</p>
      </div>
    </div>
  );
};

export default Confirmation;
