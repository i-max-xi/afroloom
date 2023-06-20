import React from "react";

const ExtraInfo = () => {
  return (
    <div>
      <h4>
        <span className="text-warning">Supplier</span> Info
      </h4>
      <form>
        <div className="form-group">
          <label for="inputAddress">Upload Picture</label>
          <input type="file" className="form-control" id="inputAddress" />
        </div>
        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <label className="mr-sm-2" for="inlineFormCustomSelect">
              Skill
            </label>{" "}
            <br />
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>Choose...</option>
              <option value="1">Carving</option>
              <option value="2">Pottery</option>
              <option value="3">Leather work</option>
              <option value="4">Bead Making</option>
              <option value="5">Others</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label for="inputAddress2">About Artisan</label>
          <textarea
            className="form-control overflow-auto"
            id="inputAddress2"
            rows="3"
            placeholder="something about yourself..."
          />
        </div>

        <div className="form-group">
          <label for="AddItem">Add Item</label>
          <input type="text" className="form-control" id="addItem" />
        </div>

        <div className="form-group">
          <label for="inputAddress">Upload Certificate</label>
          <input type="file" className="form-control" id="addCertificate" />
        </div>

        <div className="form-group">
          <a href="tnc">Terms and Conditions</a>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input radio"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" for="gridCheck">
              I Agree
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-warning text-white w-100 mt-4 shadow-sm"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ExtraInfo;
