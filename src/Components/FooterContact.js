import React from "react";

export const FooterContact = ({ infoDetail, infoImage, infoTitle }) => {
  return (
    <li className="d-flex">
      <div className="mx-1 footer-icon">{infoImage}</div>
      <div className="mx-auto">
        <h5 className="footer-icon-title">{infoTitle}</h5>
        <p className="footer-icon-sub-title">{infoDetail}</p>
      </div>
    </li>
  );
};

export const FooterContact2 = ({ infoDetail, infoImage, infoTitle, Width }) => {
  return (
    <div className="col-sm-6 col-md-3 mx-2" style={{width: '30%'}}>
      <div className="info-wrapper">
        <div className="mx-1 info-icon" style={{width: Width}}>{infoImage}</div>
        <div className="mx-auto info-content">
          <h5>{infoTitle}</h5>
          <p>{infoDetail}</p>
        </div>
      </div>
    </div>
  );
};
