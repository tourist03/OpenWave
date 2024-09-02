import React, { Component } from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div>
      <img className="my-3" src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
