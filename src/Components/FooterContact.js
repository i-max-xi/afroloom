import React from "react";

export const FooterContact = ({ infoDetail, infoDetail2, infoImage, infoTitle }) => {
  return (
    <li className="d-flex">
      <div className="mx-1 footer-icon">{infoImage}</div>
      <div className="mx-auto">
        <h5 className="footer-icon-title">{infoTitle}</h5>
        <div className="footer-icon-sub-title ">{infoDetail.map((info) => (<p>{info}</p>))}</div>

      </div>
    </li>
  );
};

export const FooterContact2 = ({ infoDetail, infoDetail2, infoImage, infoTitle, Width }) => {
  return (
    <div className="col-sm-6 col-md-3 col-12 mx-auto">
      <div className="info-wrapper">
        <div className="mx-1 info-icon" style={{width: Width}}>{infoImage}</div>
        <div className="mx-auto info-content">
          <h5>{infoTitle}</h5>
          <div className="footer-icon-sub-title ">{infoDetail.map((info) => (<p>{info}</p>))}</div>
          {/* <p>{infoDetail2}</p>  */}
        </div>
      </div>
    </div>
  );
};
