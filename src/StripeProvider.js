// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// // Load your Stripe public key
// const stripePromise = loadStripe(
//   'pk_test_51MMGLKK0xOGemk5HLzK5cEVC0DpSAYtxR9NDkD4mviS3jJFAFji3xKU8DwL5a6g9iEbOUQsoH7ywwAsXEBSHzfPy00PbT2jwDp',
// ); // Replace with your actual Stripe public key
// const StripeProvider = ({children}) => {
//   return <Elements stripe={stripePromise}>{children}</Elements>;
// };
// export default StripeProvider;


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

// Load your Stripe public key
const StripeProvider = ({ children }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStripeJs = async () => {
      try {
        const stripe = await loadStripe(
          'pk_test_51MMGLKK0xOGemk5HLzK5cEVC0DpSAYtxR9NDkD4mviS3jJFAFji3xKU8DwL5a6g9iEbOUQsoH7ywwAsXEBSHzfPy00PbT2jwDp' // Replace with your actual Stripe public key
        );
        if (!stripe) {
          throw new Error('Failed to initialize Stripe.js');
        }
        setStripePromise(stripe);
      } catch (err) {
        console.error('Error loading Stripe.js:', err);
        if (err.isAxiosError) {
          console.error('Axios error details:', err.response?.data || err.message);
        }
        setError('Unable to load payment functionality. Please try again later.');
      }
    };

    loadStripeJs();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>; // Replace with your custom error UI
  }

  if (!stripePromise) {
    return <div>Loading payment functionality...</div>; // Replace with your custom loading UI
  }

  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
