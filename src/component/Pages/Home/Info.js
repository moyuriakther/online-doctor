import React from "react";

const Info = ({ info }) => {
  return (
    <div
      className={`card text-white p-6 md:card-side shadow-xl ${info.bgClass}`}
    >
      <figure>
        <img src={info.icon} alt="icon" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{info.name}</h2>
        <p>{info.description}</p>
      </div>
    </div>
  );
};

export default Info;
