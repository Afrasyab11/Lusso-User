import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { apiEndpoints } from '../constants/api-endpoints';
import makeApiCall from '../lib/apiCall';
import { checkNullOrEmpty, getCookies } from '../utils/utils';
const useStripeHook = () => {
  const stripe = useStripe();
  const elements = useElements();
  let user = getCookies('authUser');
  // console.log('analyticsId useStripeHook===0>', analyticsId);
  const [isLoading, setIsLoading] = useState(false);

  const registerStripeCustomer = async () => {
    const getCustomer = await makeApiCall(apiEndpoints.registerStripeCustomer);
    if (getCustomer?.id) {
      return getCustomer?.id;
    }
    return;
  };

  const getStripeCustomer = async () => {
    const getCustomer = await makeApiCall(apiEndpoints.getStripeCustomer);
    if (!getCustomer?.data?.[0]?.id) {
      return registerStripeCustomer();
    } else {
      return getCustomer?.data?.[0]?.id;
    }
  };

  const makeSubscription = async (activePriceId, stripeCustomerId) => {
    const postsData = {
      ...apiEndpoints.createStripeSubscription,
      params: {
        query: {
          priceId: activePriceId,
          customerId: stripeCustomerId,
        },
      },
    };
    const resp = await makeApiCall(postsData);
    if (resp && resp?.latest_invoice?.payment_intent?.client_secret) {
      return {
        client_secret: resp?.latest_invoice?.payment_intent?.client_secret,
        subscriptionId: resp.id,
      };
    }
    return {client_secret: '', subscriptionId: ''};
  };

  const cardPayment = async ({
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    priceId,
    planName,
  }) => {
    if (!elements) return {message: 'Elements not loaded', type: 'error'};

    const cardNumberElement = elements?.getElement(CardNumberElement);
    const cardCvcElement = elements?.getElement(CardCvcElement);
    const cardExpiryElement = elements?.getElement(CardExpiryElement);

    if (!cardNumberElement || !cardCvcElement || !cardExpiryElement) {
      return {message: 'Card elements not found', type: 'error'};
    }
    setIsLoading(true);
    const stripeCustomerId = await getStripeCustomer();
    const intentResp = await makeSubscription(priceId, stripeCustomerId);
    if (!intentResp || !intentResp.client_secret) {
      setIsLoading(false);
      return {message: 'Failed to create payment intent', type: 'error'};
    }

    const {error: paymentMethodError, paymentMethod} =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        // card: {
        //   number: cardNumberElement.value,
        //   cvc: cardCvcElement.value,
        //   exp_month: parseInt(exp_month, 10),
        //   exp_year: parseInt(exp_year, 10),
        // },
      });

    if (paymentMethodError) {
      setIsLoading(false);
      return {
        message: paymentMethodError.message ?? 'Something went wrong',
        type: 'error',
      };
    }

    const {error: confirmError, paymentIntent} =
      await stripe.confirmCardPayment(intentResp.client_secret, {
        payment_method: paymentMethod.id,
      });

    setIsLoading(false);
    const postsData = {
      ...apiEndpoints.addPaymentHistory,
      params: {
        query: {
          packageName: planName,
          paymentStatus: paymentIntent?.status === 'succeeded',
          stripeSubscriptionId: intentResp?.subscriptionId,
          isUpgrade: !checkNullOrEmpty(user?.analyticsId) ? false : true,
        },
      },
    };
    await makeApiCall(postsData);
    if (confirmError) {
      return {
        message: confirmError.message ?? 'Something went wrong',
        type: 'error',
      };
    } else if (paymentIntent.status === 'succeeded') {
      return {
        message: 'Payment completed successfully',
        type: 'success',
      };
    }

    return {message: 'Unknown error occurred', type: 'error'};
  };

  return {isLoading, cardPayment};
};

export default useStripeHook;
