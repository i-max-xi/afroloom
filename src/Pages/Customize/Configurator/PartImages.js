import React from 'react';

const PartImages = ({ selectedClothing, selectedPart }) => {
  const isDivided = selectedClothing.parts.length > 5;
  const totalItems = selectedClothing.parts.length;
  const itemsPerColumn = Math.ceil(totalItems / 2); // Calculate how many items should appear in each column

  return (
    <div className="part-panel" style={{ width: "20%" }}>
      <div className="d-flex flex-row">
        {isDivided || selectedClothing.name === "Logo Up, Text Down Sash" ? (
          // If there are more than 5 items, divide into two columns
          <>
            {/* Left Column */}
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              {selectedClothing.parts.slice(0, itemsPerColumn).map((part, index) => (
                <img
                  src={part}
                  key={index}
                  alt={`Part ${index}`}
                  width="130%"
                  style={{ maxHeight: "120px" }}
                  className={`part-image ${
                    (selectedPart !== null && selectedPart === index)
                      ? "selected-part-image-border"
                      : ""
                  }`}
                />
              ))}
            </div>
  
            {/* Add some space between the columns */}
            <div style={{ width: "1.4rem" }}></div>
  
            {/* Right Column */}
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              {selectedClothing.parts.slice(itemsPerColumn).map((part, index) => (
                <img
                  src={part}
                  key={index}
                  alt={`Part ${index + itemsPerColumn}`}
                  width="130%"
                  style={{ maxHeight: "120px" }}
                  className={`part-image ${
                    (selectedPart !== null && (index + itemsPerColumn) === selectedPart)
                      ? "selected-border"
                      : ""
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          // If there are 5 or fewer items, render them in a single column
          <div className="d-flex flex-column" style={{ flex: 1 }}>
            {selectedClothing.parts.map((part, index) => (
              <img
                src={part}
                key={index}
                alt={`Part ${index}`}
                width="100%"
                className={`part-image ${
                  (selectedPart !== null && selectedPart === index)
                    ? "selected-border"
                    : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartImages;
