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
        // backgroundColor: "white",
        borderRadius: "1rem",
        // flex: 1,
      }}
    >
      {Icon && Icon}
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", borderRadius: "1rem", aspectRatio: 1/1, objectFit: "cover", backgroundColor: "white"}}
        />
      )}

      <h5 className="mt-2">{title}</h5>
      <p className={`text-decoration-none text-black ${centerText && "text-center"}`}>{description}</p>
    </div>
  );
};

export default ListItem;
