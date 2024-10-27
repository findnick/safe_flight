import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Button3 from "../Common/Button3";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "/user/flight-bookings",
        },
      });

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        handleError(error);
      } else {
        navigate("/user/flight-bookings");
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/user/flight-bookings");
    }
  };

  return (
    <>
      <div className="flex flex-col mb-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto md:w-1/3"
        >
          <PaymentElement />
          <Button3
            type="submit"
            disabled={!stripe || loading}
            style={{ margin: "15px 0px" }}
          >
            Submit
          </Button3>
          {errorMessage && (
            <div className="font-light text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
