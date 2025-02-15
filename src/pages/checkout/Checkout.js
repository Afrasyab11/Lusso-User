import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import BTClogo from '../../assets/images/BTClogo.png';
import PaymentCard from '../../assets/images/PaymentCard.png';
import {getCookies} from '../../utils/utils';
import './Checkout.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#d1d5db',
      fontSize: '16px',
      '::placeholder': {
        color: '#9ca39f',
      },
      backgroundColor: 'transparent',
      border: '1px solid #a768fd',
      borderRadius: '9999px',
      padding: '12px 16px',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
    },
    invalid: {
      color: '#ff4d4d',
    },
  },
};

const Checkout = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default is card
  const [cardNumberError, setCardNumberError] = useState(null);
  const [cardExpiryError, setCardExpiryError] = useState(null);
  const [cardCvcError, setCardCvcError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = event => {
    if (event.error) {
      setCardNumberError(event.error.message);
    } else {
      setCardNumberError(null);
    }
  };

  const handleCardExpiryChange = event => {
    if (event.error) {
      setCardExpiryError(event.error.message);
    } else {
      setCardExpiryError(null);
    }
  };

  const handleCardCvcChange = event => {
    if (event.error) {
      setCardCvcError(event.error.message);
    } else {
      setCardCvcError(null);
    }
  };

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
      const cardNumberElement = elements.getElement(CardNumberElement);
      const {error, paymentIntent} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
          },
        },
      );
      if (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else if (paymentIntent.status === 'succeeded') {
        navigate('/explore');
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
      } else if (paymentIntent.status === 'succeeded') {
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="my-10">
        <h2 className="text-3xl font-bold text-white mb-6">SECURE CHECKOUT</h2>

        <div className="flex flex-wrap gap-6">
          <div className="card-bg-dev rounded-2xl p-8 text-white flex-grow flex-shrink-0 w-full md:w-[600px] h-[630px]">
            <h3 className="text-3xl font-normal text-[#ffffff] mb-6">
              Order Summary
            </h3>
            <div className="w-full h-0.5 bg-blue-500 mt-12 mb-10"></div>

            <h4 className="text-xl font-semibold text-blue-400 mt-12 mb-9">
              Lusso Access
            </h4>

            <div className="flex justify-between mb-6">
              <span className="text-4xl font-normal text-white">Monthly:</span>
              <span className="text-4xl font-normal text-white">
                ${sessionStorage.getItem('selectedPrice')}
              </span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-normal text-xl">
                Promotion (50% off for 2 months):
              </span>
              <span className="font-bold text-[#7DF018]">$0</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-4xl font-normal text-white">Tax:</span>
              <span className="text-4xl font-normal text-white">$0</span>
            </div>

            <div className="w-full h-0.5 bg-blue-500 my-12"></div>

            <div className="flex justify-between text-4xl font-normal text-white">
              <span>Subtotal:</span>
              <span>${sessionStorage.getItem('selectedPrice')}</span>
            </div>
          </div>

          <div className="card-bg-dev rounded-2xl p-8 text-white flex-grow flex-shrink-0 w-full md:w-[600px] h-[630px]">
            <form onSubmit={handleSubmit}>
              <h3 className="text-3xl font-normal text-[#ffffff] mb-4">
                Select Your Payment Method
              </h3>
              <div className="flex justify-center gap-6 my-[40px]">
                <div className="mb-3 w-full bg-[#00F0FB1F] border border-[#00F0FB1F] rounded-2xl p-3 flex items-center">
                  <img
                    src={PaymentCard}
                    alt="PaymentCard"
                    className="!w-4 h-4 object-cover"
                  />
                  <div className="pl-4">Debit/Credit</div>
                </div>
                <div className="mb-3 w-full bg-[#403076] border border-[#403076] rounded-2xl p-3 flex items-center">
                  <img
                    src={BTClogo}
                    alt="PaymentCard"
                    className="!w-4 h-4 object-cover"
                  />
                  <div className="pl-4">
                    Pay with USDC (crypto)
                    <span className="block text-xs text-gray-300">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[50px]">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                  />
                </div>
                <div className="col-span-2">
                  <CardNumberElement
                    options={{
                      ...CARD_ELEMENT_OPTIONS,
                      placeholder: 'Card Number',
                    }}
                    onChange={handleCardNumberChange}
                    className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                  />
                  {cardNumberError && (
                    <span className="text-red-500 text-sm">
                      {cardNumberError}
                    </span>
                  )}
                </div>
                <div>
                  <CardExpiryElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handleCardExpiryChange}
                    className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                  />
                  {cardExpiryError && (
                    <span className="text-red-500 text-sm">
                      {cardExpiryError}
                    </span>
                  )}
                </div>
                <div>
                  <CardCvcElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handleCardCvcChange}
                    className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                  />
                  {cardCvcError && (
                    <span className="text-red-500 text-sm">{cardCvcError}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5 justify-start my-5">
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  style={{
                    background:
                      'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)',
                  }}
                  className="py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
                <button
                  type="button"
                  className="relative py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full border-2 bg-transparent gradient-border border-[#4B03CE]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
