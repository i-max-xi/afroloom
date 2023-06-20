import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropDowner = ({
  title,
  options,
  selectedColor,
  bgColor,
  icon,
  alternative,
  altClass
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
          <span className="mx-1">
            {icon}
          </span>

          <span className={altClass}>{alternative}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ height: "35vh", overflowY: "scroll" }}>
          {options.map((option) => (
            <Dropdown.Item className="text-black" key={option.index} href="#">
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDowner;
