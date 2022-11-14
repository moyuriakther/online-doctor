import React from "react";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import Info from "./Info";

const Infos = () => {
  const infos = [
    {
      _id: 1,
      icon: clock,
      name: "Opening Hours",
      description: "our hospital open in 24/7 hours",
      bgClass: "bg-gradient-to-r from-primary to-secondary",
    },
    {
      _id: 2,
      icon: marker,
      name: "Visit Our Location",
      description: "our hospital open in 24/7 hours",
      bgClass: "bg-accent",
    },
    {
      _id: 3,
      icon: phone,
      name: "Contact Us Now",
      description: "our hospital open in 24/7 hours",
      bgClass: "bg-gradient-to-r from-primary to-secondary",
    },
  ];

  return (
    <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-12">
      {infos.map((info) => (
        <Info info={info} key={info._id} />
      ))}
    </div>
  );
};

export default Infos;
