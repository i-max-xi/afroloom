import React from 'react';

const PartImages = ({ selectedClothing, selectedPart }) => {
  const isDivided = selectedClothing.parts.length > 5;

  return (
    <div className="part-panel" style={{ width: "20%" }}>
      <div className="d-flex flex-row">
        {isDivided ? (
          // If there are more than 5 items, divide into two columns
          <>
            {/* Left Column */}
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              {selectedClothing.parts.slice(0, 5).map((part, index) => (
                <img
                  src={part}
                  key={index}
                  alt={`Part ${index}`}
                  width="130%"
                  className={`part-image ${
                    (selectedPart !== null && selectedPart === index)
                      ? "selected-border"
                      : ""
                  }`}
                />
              ))}
            </div>
  
            {/* Add some space between the columns */}
            <div style={{ width: "1.1rem" }}></div>
  
            {/* Right Column */}
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              {selectedClothing.parts.slice(5).map((part, index) => (
                <img
                  src={part}
                  key={index}
                  alt={`Part ${index}`}
                  width="130%"
                  className={`part-image ${
                    (selectedPart !== null && (index + 5) === selectedPart)
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
