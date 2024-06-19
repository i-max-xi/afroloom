import React from "react";



const ListItem = ({
  image,
  title,
  description,
  Icon,
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
          style={{ width: "100%", borderRadius: "1rem", height: "auto"}}
        />
      )}

      <h5 className="mt-2">{title}</h5>
      <p className="description-text">{description}</p>
    </div>
  );
};

export default ListItem;
