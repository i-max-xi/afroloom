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
      className="flex flex-col gap-1 lg:w-full"
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
          className="object-cover lg:h-96 bg-white aspect-square rounded-xl"
          // style={{borderRadius: "2rem"}}
          loading="lazy"
        />
      )}

      <div className="flex flex-col gap-1 mt-1 justify-center">
        <h5 className="text-decoration-none font-medium text-black text-sm lg:text-xl min-h-[2rem]">{title}</h5>
        <p
          className={`text-decoration-none text-xs  text-black m-0 ${centerText && "text-center"}`}
        >
          {description}
        </p>
        <p
          style={{ fontSize: "0.8rem" }}
          className={`mt-1 text-decoration-none text-xs text-black ${centerText && "text-center"}`}
        >
          {extraDescription}
        </p>
      </div>
     
    </div>
  );
};

export default ListItem;
