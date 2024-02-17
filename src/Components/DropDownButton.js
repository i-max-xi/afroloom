import React from "react";
import { Link } from "react-router-dom";
import { buttonVariant } from "./types";



const DropDownButton = ({ options, iconleft, title, variant }) => {

  return (
    <>
      <div class="dropdown">
        <button
          class={`btn ${variant === buttonVariant.primary ? "btn-warning text-white": "" } dropdown-toggle`}
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="m-1">{iconleft}</span>
          {title}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div className="d-flex flex-column px-2" style={{ gap: "0.5rem" }}>
            {options.map((option, index) => (
              <Link
                to={option.link}
                className={`cat-dropdown text-decoration-none text-${option.variant}`}
                key={option.name}
              >
                {option.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDownButton;
