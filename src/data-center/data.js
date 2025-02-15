import { ICON_ENUM } from '../constants/icons.constant';

export const PLANS_ENUM = [
  {
    title: 'Basic',
    subTitle: 'Lusso',
    planType: 'Free',
    price: 'Free',
    duration: '',
    color: 'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
    bg: 'explore-price-bg',
    features: [
      'Browse through all available inventory.',
      'Ideal for users who want to explore the platform before committing.',
    ],
  },
  {
    title: 'Access',
    subTitle: 'Lusso',
    planType: 'Basic Plan',
    price: '99.99',
    duration: 'months',
    color: 'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
    bg: 'access-price-bg',
    features: [
      'Includes 50 digital products and complete customization.',
      'Perfect for small projects and individual use.',
      'Free updates for 3 months.',
    ],
  },
  {
    title: 'Elite',
    subTitle: 'Lusso',
    planType: 'Basic Plan',
    price: '199.99',
    duration: 'months',
    color: 'linear-gradient(180deg, #460F88 0%, #9B56FE 100.32%)',
    bg: 'elite-price-bg',
    features: [
      'Includes 50 digital products and complete customization.',
      'Perfect for small projects and individual use.',
      'Free updates for 3 months.',
    ],
  },
  {
    title: 'Infinity',
    subTitle: 'Lusso',
    planType: 'Basic Plan',
    price: '399.99',
    duration: 'months',
    color: 'linear-gradient(181.2deg, #B00D98 0.45%, #FF5EE5 98.74%)',
    bg: 'infinity-price-bg',
    features: [
      'Includes 50 digital products and complete customization.',
      'Perfect for small projects and individual use.',
      'Free updates for 3 months.',
    ],
  },
];

export const CREATOR_PLANS_ENUM = [
  {
    id: 1,
    title: 'Access',
    subTitle: 'Lusso',
    planType: 'Basic Plan',
    price: '199.99',
    duration: 'month',
    active: true,
    priceId: 'price_1QSNstK0xOGemk5HNkVzEZkH',
    color: 'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
    bg: 'access-price-bg',
    features: [
      'Includes 50 digital products and complete customization.',
      'Perfect for small projects and individual use.',
      'Free updates for 3 months.',
    ],
  },
  {
    id: 2,
    title: 'Elite',
    subTitle: 'Lusso',
    planType: 'Basic Plan',
    price: '299.99',
    duration: 'month',
    color: 'linear-gradient(180deg, #460F88 0%, #9B56FE 100.32%)',
    bg: 'elite-price-bg',
    priceId: 'price_1QSNtrK0xOGemk5HzzVj2IjI',
    features: [
      'Includes 50 digital products and complete customization.',
      'Perfect for small projects and individual use.',
      'Priority customer support',
    ],
  },
  {
    id: 3,
    title: 'Infinity',
    subTitle: 'Lusso',
    planType: 'Basic Plan',
    price: '399.99',
    duration: 'month',
    color: 'linear-gradient(181.2deg, #B00D98 0.45%, #FF5EE5 98.74%)',
    bg: 'infinity-price-bg',
    priceId: '',
    features: [
      'Includes 50 digital products and complete customization.',
      'Perfect for freelancers and design enthusiasts',
      'Free updates for 12 months.',
      'Priority customer support',
    ],
  },
];

export const PAYMENT_METHODS_ENUM = [
  // {icon: ICON_ENUM.APPLE_PAY.icon, name: 'Apple Pay'},
  {
    icon: ICON_ENUM.DEBIT_CARD.icon,
    name: 'Debit/ Credit',
    type: 'card',
    currency: 'usd',
  },
  // {icon: ICON_ENUM.GOOGLE_WALLET.icon, name: 'Google Wallet'},
  {
    icon: ICON_ENUM.BITCOIN.icon,
    name: 'BTC',
    type: 'crypto',
    currency: 'usdt',
  },
];
