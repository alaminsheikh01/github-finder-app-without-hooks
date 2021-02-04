import React, { Fragment } from "react";
import Spinners from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={Spinners}
        alt="Loading..."
        style={{ width: "200px", display: "block", margin: "auto" }}
      ></img>
    </Fragment>
  );
};

export default Spinner;
