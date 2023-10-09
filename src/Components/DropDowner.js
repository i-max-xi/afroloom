import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const DropDowner = ({
  title,
  options,
  selectedColor,
  bgColor,
  icon,
  alternative,
  altClass,
}) => {
  return (
    <div className="rounded mt-2" style={{ backgroundColor: bgColor }}>
      <Dropdown>
        <span className="" style={{ float: "left", color: selectedColor }}>
          {title}
        </span>
        <Dropdown.Toggle
          variant="none"
          style={{ color: selectedColor, float: "right" }}
        >
          <span className="mx-1">{icon}</span>

          <span className={altClass}>{alternative}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            height: "",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            padding: "1rem 1rem 0.5rem 1rem",
            fontWeight: "normal",
          }}
          
        >
          {options.map((option, index) => (
            <Link
              to={option.link}
              className={`mb-2 cat-dropdown text-decoration-none text-${option.variant}`}
              key={option.name}
            >
              {option.name}
            </Link>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDowner;
