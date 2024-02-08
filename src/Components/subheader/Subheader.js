import React from "react";
import { Link } from "react-router-dom";
import "./Subheader.css"; // Import your CSS file

const Subheader = () => {
  const options = [
    { name: "Create your own", link: "/customize" },
    { name: "Book a tour guide", link: "/professional/Tour Guide" },
    { name: "Book a photographer / videographer", link: "/professional/Photographer" },
    { name: "Book a model", link: "/professional/Model" },
  ];

  return (
    <div className="subheader-container">
      <div className="scrollable-links">
        {options.map(({ name, link }) => (
          <Link key={name} to={link}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subheader;
