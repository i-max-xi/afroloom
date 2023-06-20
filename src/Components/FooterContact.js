import React from "react";

export const FooterContact = ({ infoDetail, infoImage, infoTitle }) => {
  return (
    <div className="d-flex">
      <div className="mx-1">{infoImage}</div>
      <div className="mx-auto">
        <h5>{infoTitle}</h5>
        <p>{infoDetail}</p>
      </div>
    </div>
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
