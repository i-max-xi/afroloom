import React from "react";
// import AfricanFlags from "./AfricanFlags";

const Header2 = ({ bgColor, Color, Padding, Icon1, Icon2, Icon3, Icon4 }) => {
  return (
    <>
      {/* <AfricanFlags /> */}

      <ul
        className="btn-group rounded-top d-flex list-unstyled justify-content-around policy-header"
        role="group"
        style={{ backgroundColor: bgColor, color: Color, padding: Padding }}
      >
        <li className="d-flex more-info border-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            fill="currentColor"
            className="bi bi-check2-circle more-info-icon"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
          </svg>
          <p className="d-flex flex-column justify-content-center">
            <span className="fw-bolder">Quality assured, payment secured!</span>
          </p>
        </li>
        
        <li className="d-flex more-info border-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            fill="currentColor"
            className="bi bi-bag-check more-info-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            />
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>

          <p className="d-flex flex-column justify-content-center">
            <span className="fw-bolder">Perfect fit on the go! </span>
            <span className="text-left" style={{ fontSize: "0.8rem" }}>
              Custom measurements in Accra and Kumasi, at your doorstep. Call
              now for a flawless fit at home or office.
            </span>
          </p>
        </li>
        
        <li className="d-flex more-info border-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            fill="currentColor"
            class="bi bi-cash-coin more-info-icon"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
            />
            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
          </svg>
          <p className="d-flex flex-column justify-content-center">
            <span className="fw-bolder">45% Down Payment</span>
            <span className="text-left" style={{ fontSize: "0.8rem" }}>
              Pay 45% deposit now and settle the remaining balance upon delivery
            </span>
          </p>
        </li>

        <li className="d-flex more-info border-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            fill="currentColor"
            className="bi bi-bootstrap-reboot more-info-icon"
            viewBox="0 0 16 16"
          >
            <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
            <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
          </svg>

          <p className="d-flex flex-column justify-content-center">
            <span className="fw-bolder text-left">Retouch Policy</span>
            <span className="text-left" style={{ fontSize: "0.8rem" }}>
              Products can be retouched within 48 hours if expectations are not met
            </span>
          </p>
        </li>
      </ul>
    </>
  );
};

export default Header2;
