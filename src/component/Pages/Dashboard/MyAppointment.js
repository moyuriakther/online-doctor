import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";

const MyAppointment = () => {
  const [myAppointments, setMyAppointment] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/booking?patientEmail=${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((data) => {
          // console.log(data.data);
          setMyAppointment(data?.data);
        })
        .catch((error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
        });
    }
  }, [user, navigate]);
  return (
    <div>
      <h1 className="text-2xl my-4">My Appointment {myAppointments?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
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
                <td>
                  {" "}
                  {a.price && !a.paid && (
                    <Link to={`/dashboard/payment/${a._id}`}>
                      <button className="btn btn-primary btn-sm">Pay</button>
                    </Link>
                  )}
                  {a.price && a.paid && (
                    <span className="text-green-500">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
