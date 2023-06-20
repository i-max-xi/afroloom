import React from "react";

const Verification = () => {
  return (
    <div>
      <h4 className="text-warning">Verification</h4>
      <p>A verification code has been sent to your provided email/phone no.</p>
      <form>
        <div className="form-group p-2 mt-4">
            {/* weve sent a verification code to your phone number */}
          <input
            type="text"
            className="form-control"
            required
            id="formGroupExampleInput"
            placeholder="Enter Verification Code"
          />
        </div>
        <button type="submit" className="btn btn-warning text-white w-100 mt-4 shadow-sm">
            Complete Sign Up
        </button>
      </form>
    </div>
  );
};

export default Verification;
