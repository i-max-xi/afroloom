import React from "react";

const ListItem = ({
  image,
  title,
  description,
  extraDescription,
  Icon,
  centerText = false,
}) => {
  return (
    <div
      className=""
      style={{
        textAlign: "left",
        borderRadius: "1rem",
      }}
    >
      {Icon && Icon}
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            borderRadius: "1rem",
            aspectRatio: 1 / 1,
            objectFit: "cover",
            backgroundColor: "white",
          }}
        />
      )}

      <h5 className="mt-2 text-decoration-none text-black">{title}</h5>
      <p
        className={`text-decoration-none text-black m-0 ${centerText && "text-center"}`}
      >
        {description}
      </p>
      <p
        style={{ fontSize: "0.8rem" }}
        className={`mt-1 text-decoration-none text-black ${centerText && "text-center"}`}
      >
        {extraDescription}
      </p>
    </div>
  );
};

export default ListItem;
