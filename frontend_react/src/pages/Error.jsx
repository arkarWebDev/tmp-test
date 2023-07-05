import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <section className="errorPage">
      <div className="errorP">
        <div className="error-text">
          <ExclamationTriangleIcon className="Icon trash" />
          <h1>Something Went Wrong!</h1>
          <ExclamationTriangleIcon className="Icon trash" />
        </div>
        <Link to={"/"}>
          <button className="btn errorBtn">Go Back Home</button>
        </Link>
      </div>
    </section>
  );
};

export default Error;
