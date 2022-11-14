import React from "react";
import chair from "../../../assets/images/chair.png";
import bgImage from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AppointmentBanner = ({ date, setDate }) => {
  return (
    <div
      className="hero min-h-screen"
      style={{ background: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={chair}
          alt="chair"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="pr-6">
          <DayPicker mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
