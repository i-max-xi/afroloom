import React from "react";



const ListItem = ({
  image,
  title,
  description,
  Icon,
  centerText = false
}) => {
  return (
    <div
      className=""
      style={{
        textAlign: "left",
        backgroundColor: Icon ? "var(--bg-secondary)" : "none",
        borderRadius: Icon ? "1rem" : "none",
        padding: Icon ? "1rem" : "none",
        // flex: 1,
      }}
    >
      {Icon && Icon}
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", borderRadius: "1rem", aspectRatio: 1/1, objectFit: "contain"}}
        />
      )}

      <h5 className="mt-2">{title}</h5>
      <p className={`description-text ${centerText && "text-center"}`}>{description}</p>
    </div>
  );
};

export default ListItem;
