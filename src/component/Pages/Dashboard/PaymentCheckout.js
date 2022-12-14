import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentCheckout = ({ patient }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/create-payment-intent", patient, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        const secret = response?.data?.clientSecret;
        if (secret) {
          setClientSecret(secret);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patient]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    error ? setCardError(error?.message) : setCardError("");
    setSuccess("");
    setProcessing(true);
    // confirm card payments
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient?.patientName,
            email: patient?.patientEmail,
          },
        },
      });
    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      console.log(paymentIntent);
      setTransactionId(paymentIntent?.id);
      setCardError("");
      setSuccess("Congrats !! Your Payment is Success");
      // send payment server and database
      const payment = {
        appointment: patient._id,
        transactionId: paymentIntent?.id,
      };
      axios
        .patch(`http://localhost:5000/booking/${patient._id}`, payment, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setProcessing(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-secondary mt-2"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success}</p>
          <p>
            Your Transaction Id:{" "}
            <small>
              <span className="text-orange-500 font-bold">{transactionId}</span>
            </small>
          </p>
        </div>
      )}
    </>
  );
};

export default PaymentCheckout;
