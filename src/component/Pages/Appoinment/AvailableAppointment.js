import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import AppointmentModal from "./AppointmentModal";
import Option from "./Option";

const AvailableAppointment = ({ date }) => {
  const [treatment, setTreatment] = useState(null);
  const formattedDate = format(date, "PP");
  const {
    data: appointmentOptions,
    isLoading,
    refetch,
  } = useQuery(["available", formattedDate], () =>
    axios
      .get(`http://localhost:5000/available?date=${formattedDate}`)
      .then((res) => res.data)
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2 className="text-secondary text-xl text-center my-7">
        Available Appointments on {format(date, "PP")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-12">
        {appointmentOptions?.map((appointment) => (
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
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AvailableAppointment;
