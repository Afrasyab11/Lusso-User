import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import axios from 'axios';
import {useState} from 'react';
import {getCookies} from '../src/utils/utils';

const cardElementOptions = {
  style: {
    base: {
      color: '#ffffff', // Sets the text color to white
      '::placeholder': {
        color: '#cccccc', // Placeholder color if you want to customize it
      },
    },
    // invalid: {
    //     color: '#ff6347', // Optional: color for invalid input
    // },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default is card
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    let token = getCookies('authToken');
    setLoading(true);
    const amount = parseFloat(sessionStorage.getItem('selectedPrice')); // Example amount ($10.00)
    const currency = 'usd'; // USD as the currency
    const paymentMethodType = paymentMethod; // "card" or "usdc"
    // Request the payment intent from your backend
    const {data} = await axios.post(
      'https://api.lusso.dev/api/v1/payment/payment-intent',
      {
        amount,
        currency,
        paymentMethod: paymentMethodType, // Send payment method type to backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const clientSecret = data['client_secret'];
    if (paymentMethod === 'card') {
      const cardElement = elements.getElement(CardElement);
      const {error, paymentIntent} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );
      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } else if (paymentMethod === 'usdc') {
      const {error, paymentIntent} = await stripe.confirmPayment({
        clientSecret,
        payment_method: {
          crypto: {
            currency: 'usdc',
          },
        },
      });
      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border border-white p-4 rounded-lg"
      >
        <h2 className="mt-[20px]">Proceed with your payment type</h2>
        <div className="mt-[20px]">
          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Pay with Card
          </label>
          <label className="ml-[20px]">
            <input
              type="radio"
              value="usdc"
              checked={paymentMethod === 'usdc'}
              onChange={() => setPaymentMethod('usdc')}
            />
            Pay with USDC (Crypto)
          </label>
        </div>
        {paymentMethod === 'card' && (
          <>
            <div className="mt-[20px]">
              <CardElement options={cardElementOptions} />
            </div>
          </>
        )}
        <div class="flex justify-between items-center w-full">
          <span
            className="mt-[16px] cursor-pointer"
            onClick={() => window.history.go(-1)}
          >
            {' '}
            {'<'} Back
          </span>
          <button
            class="rounded-full mt-[20px] bg-[#9f4bf5] px-[15px] py-[5px]"
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
        {error && <div className="text-[#eb1c26]">{error}</div>}
        {success && <div className="text-[#50C878]">Payment successful!</div>}
      </form>
    </>
  );
};
export default CheckoutForm;
