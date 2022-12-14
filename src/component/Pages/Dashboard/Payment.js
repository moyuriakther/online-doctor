import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "./PaymentCheckout";

const stripePromise = loadStripe(
  "pk_test_51MD6lqF708GC2KnrMW6xvgPBGKzd1hs2eQEpgYBcK9351PDUKnJUylOJTLkl4O5OCKOSJ146rfJg943k88uyuzCk00OMRjtSFY"
);

const Payment = () => {
  const { id } = useParams();
  const { data: patient, isLoading } = useQuery(["doctors", id], () =>
    axios
      .get(`https://online-doctor.onrender.com/booking/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => console.log(err))
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-secondary font-bold">
              Hello {patient?.patientName}
            </p>
            <h2 className="card-title">
              Please Pay For{" "}
              <span className="text-warning"> {patient?.treatmentName}</span>
            </h2>
            <p>
              Your Appointment On: {patient?.date} at {patient?.slot}
            </p>
            <p>
              Please Pay <strong>${patient?.price}</strong>
            </p>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div className="card-body shadow-xl">
            <Elements stripe={stripePromise}>
              <PaymentCheckout patient={patient} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
