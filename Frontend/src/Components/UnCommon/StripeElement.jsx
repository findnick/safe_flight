import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import { useState } from "react";

export default function StripeElement({
  amount,
  currency,
  showSubmitButton = true,
}) {
  const { VITE_STRIPE_PUBLISHABLE_KEY } = import.meta.env;
  const stripe = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);
  const options = {
    mode: "payment",
    amount: parseInt(parseFloat(amount) * 100),
    currency: currency.toLowerCase(),
    appearance: {
      theme: "stripe",
      variables: {
        fontFamily: "'Raleway', serif",
      },
    },
  };
  // const useStripe = useStripe();
  // const useElements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleError = (error) => {
    setLoading(false);
    setError(error);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!useStripe) {
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setLoading(true);

  //   // Trigger form validation and wallet collection
  //   const { error: submitError } = await useElements.submit();
  //   if (submitError) {
  //     handleError(submitError);
  //     return;
  //   }
  // };

  return (
    <Elements stripe={stripe} options={options}>
      <form>
        <PaymentElement
          options={{
            layout: {
              type: "accordion",
              defaultCollapsed: false,
              radios: false,
              spacedAccordionItems: true,
            },
          }}
        />
        {showSubmitButton && (
          <Button
            htmlType="submit"
            type="primary"
            className="mt-3 font-bold"
            block
            disabled={!useStripe || loading}
          >
            Pay
          </Button>
        )}
      </form>
    </Elements>
  );
}
