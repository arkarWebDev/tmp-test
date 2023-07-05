import React from "react";

const Loader = () => {
  return (
    <section className="loading">
      <div class="lds-hourglass"></div>
      <p>
        Loading Your Page.<span>Please be Patient!</span>
      </p>
    </section>
  );
};

export default Loader;
