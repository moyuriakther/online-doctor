import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import Option from "./Option";

const AvailableAppointment = ({ date }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments")
      .then((res) => setAppointmentOptions(res.data));
  }, []);
  return (
    <div>
      <h2 className="text-secondary text-xl text-center my-7">
        Available Appointments on {format(date, "PP")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-12">
        {appointmentOptions.map((appointment) => (
          <Option
            setTreatment={setTreatment}
            appointment={appointment}
            key={appointment._id}
          />
        ))}
      </div>
      {treatment && (
        <AppointmentModal
          setTreatment={setTreatment}
          date={date}
          treatment={treatment}
        />
      )}
    </div>
  );
};

export default AvailableAppointment;
