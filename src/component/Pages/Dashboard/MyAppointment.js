import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";

const MyAppointment = () => {
  const [myAppointments, setMyAppointment] = useState([]);
  const [user] = useAuthState(auth);
  // console.log(myAppointments);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/booking?patientEmail=${user.email}`)
        .then((data) => setMyAppointment(data.data));
    }
  }, [user]);
  return (
    <div>
      <h1 className="text-2xl my-4">My Appointment {myAppointments.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((a, index) => (
              <tr key={a._id}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.treatmentName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
