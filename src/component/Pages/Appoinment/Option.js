import React from "react";

const Option = ({ appointment, setTreatment }) => {
  const { name, slots } = appointment;
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{name}</h2>
        <p>
          {slots.length > 0 ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-600">Try Another Date</span>
          )}
        </p>
        <p>
          {slots.length}
          {slots.length > 1 ? "SPACES" : "SPACE"} AVAILABLE
        </p>
        <div className="card-actions justify-center">
          <label
            htmlFor="appointment-modal"
            disabled={slots.length === 0}
            onClick={() => setTreatment(appointment)}
            className="btn bg-gradient-to-r from-secondary to-primary"
          >
            BOOK APPOINTMENT
          </label>
        </div>
      </div>
    </div>
  );
};

export default Option;
