import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// top trending
import brain from '../assets/images/home/products/brain.png';
import camera from '../assets/images/home/products/camera.png';
import men from '../assets/images/home/products/men.png';
import phone from '../assets/images/home/products/phone.png';
import mindEase from '../assets/images/home/products/yoga.png';

// movies
import deadpool from '../assets/images/home/products/deadpool.png';
import imax from '../assets/images/home/products/imax.png';
import mendalorian from '../assets/images/home/products/mandalorian.png';
import openheimar from '../assets/images/home/products/openheimer.png';
import squidGame from '../assets/images/home/products/squid-game.png';
// courses
import architecture from '../assets/images/home/products/architecture.png';
import digitalMarketing from '../assets/images/home/products/digital-marketing.png';
import lab from '../assets/images/home/products/lab.png';
import uiUx from '../assets/images/home/products/ui-ux.png';
import vr from '../assets/images/home/products/vr.png';
// services
import axios from 'axios';
import audit from '../assets/images/home/products/audit.png';
import builders from '../assets/images/home/products/builders.png';
import homeCleaning from '../assets/images/home/products/home-cleaning.png';
import lawFirm from '../assets/images/home/products/law-firm.png';
import movingBuddy from '../assets/images/home/products/moving-buddy.png';

export const checkNullOrEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object?.keys(value)?.length === 0)
  );
};

export const typeDetector = value => {
  return value === undefined
    ? 'undefined'
    : value === null
      ? 'null'
      : Array.isArray(value)
        ? 'array'
        : typeof value === 'object'
          ? 'object'
          : 'empty';
};
export const tokenDecode = token => {
  return jwtDecode(token);
};
export const setCookies = (key, value, expireIn = 7) => {
  if (checkNullOrEmpty(key)) return null;
  Cookies.set(key, JSON.stringify(value), { expires: expireIn }); // Expires in 7 days
};
// export const getCookies = key => {
//   if (checkNullOrEmpty(key)) return null;
//   return JSON.parse(Cookies.get(key));
// };
export const getCookies = key => {
  if (checkNullOrEmpty(key)) return null;

  const cookieValue = Cookies.get(key);

  if (!cookieValue) return null;

  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    console.error('Invalid JSON in cookie:', error);
    return null;
  }
};

export const setSessionItem = (key, value) => {
  if (checkNullOrEmpty(key)) return null;
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = key => {
  if (checkNullOrEmpty(key)) return null;

  const value = JSON.parse(sessionStorage.getItem(key));

  if (!value) return null;

  try {
    return value;
  } catch (error) {
    console.error('Invalid JSON in cookie:', error);
    return null;
  }
};

export const regixValidation = (value, regix) => {
  if (checkNullOrEmpty(value)) return { isValid: true, msg: '' };
  if (!regix?.pattern?.test(value)) {
    return { isValid: false, msg: regix?.msg ?? '' };
  }

  return { isValid: true, msg: '' };
};

export const daysAgoDate = (days = 7) => {
  return new Date(new Date().setDate(new Date().getDate() - days));
};

export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const fomatedDateMonthDY = date => {
  const dateChecker = checkNullOrEmpty(date) ? new Date() : date;
  const checkDate =
    typeof dateChecker === 'string' ? new Date(dateChecker) : dateChecker;
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return checkDate.toLocaleDateString('en-US', options);
};

export const sortDataByDateTime = (
  data,
  targetKey = 'dateTime',
  order = 'asc',
) => {
  return data.sort((a, b) => {
    const dateA = new Date(a[targetKey]);
    const dateB = new Date(b[targetKey]);

    return order === 'desc'
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });
};

export const roundUpToNearest = (value, roundTo = 5) => {
  return Math.ceil(value / roundTo) * roundTo;
};

export const roundToOneDecimal = (value = 0) => {
  return Math.round(value * 10) / 10;
};

export const BusinessTypeOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Education', label: 'Education' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Telecommunications', label: 'Telecommunications' },
  {
    value: 'Transportation and Logistics',
    label: 'Transportation and Logistics',
  },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Hospitality and Tourism', label: 'Hospitality and Tourism' },
  { value: 'Media and Entertainment', label: 'Media and Entertainment' },
  { value: 'Food and Beverage', label: 'Food and Beverage' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Aerospace and Defense', label: 'Aerospace and Defense' },
  { value: 'Biotechnology', label: 'Biotechnology' },
  { value: 'Chemicals', label: 'Chemicals' },
  { value: 'Consumer Goods', label: 'Consumer Goods' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Environmental Services', label: 'Environmental Services' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Legal Services', label: 'Legal Services' },
  { value: 'Mining and Extraction', label: 'Mining and Extraction' },
  { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'Publishing', label: 'Publishing' },
  {
    value: 'Public Services and Government',
    label: 'Public Services and Government',
  },
  { value: 'Sports and Recreation', label: 'Sports and Recreation' },
  { value: 'Textiles and Apparel', label: 'Textiles and Apparel' },
  {
    value: 'Venture Capital and Private Equity',
    label: 'Venture Capital and Private Equity',
  },
  { value: 'Water and Waste Management', label: 'Water and Waste Management' },
  { value: 'Advertising and Marketing', label: 'Advertising and Marketing' },
  { value: 'Arts and Culture', label: 'Arts and Culture' },
  { value: 'Information Services', label: 'Information Services' },
  { value: 'Human Resources', label: 'Human Resources' },
  {
    value: 'Professional Services (Consulting)',
    label: 'Professional Services (Consulting)',
  },
  { value: 'Shipping and Maritime', label: 'Shipping and Maritime' },
  {
    value: 'Event Planning and Management',
    label: 'Event Planning and Management',
  },
  {
    value: 'Non-Profit and Social Services',
    label: 'Non-Profit and Social Services',
  },
  {
    value: 'Telecommunications Equipment',
    label: 'Telecommunications Equipment',
  },
  { value: 'Warehousing and Storage', label: 'Warehousing and Storage' },
  { value: 'Investment Management', label: 'Investment Management' },
  { value: 'Medical Devices', label: 'Medical Devices' },
  { value: 'Renewable Energy', label: 'Renewable Energy' },
  { value: 'Freight and Cargo', label: 'Freight and Cargo' },
  { value: 'Oil and Gas', label: 'Oil and Gas' },
  { value: 'Robotics and Automation', label: 'Robotics and Automation' },
  {
    value: 'Video Games and Interactive Media',
    label: 'Video Games and Interactive Media',
  },
  { value: 'Food Production', label: 'Food Production' },
  { value: 'Fashion and Apparel', label: 'Fashion and Apparel' },
  { value: 'Luxury Goods', label: 'Luxury Goods' },
  {
    value: 'Data Analytics and Business Intelligence',
    label: 'Data Analytics and Business Intelligence',
  },
  {
    value: 'Blockchain and Cryptocurrency',
    label: 'Blockchain and Cryptocurrency',
  },
  {
    value: 'Artificial Intelligence and Machine Learning',
    label: 'Artificial Intelligence and Machine Learning',
  },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  {
    value: 'Space Exploration and Technology',
    label: 'Space Exploration and Technology',
  },
  { value: 'Beauty and Personal Care', label: 'Beauty and Personal Care' },
  { value: 'Industrial Engineering', label: 'Industrial Engineering' },
  {
    value: 'Event Production and Planning',
    label: 'Event Production and Planning',
  },
];

export const SortByOptions = [
  { value: 'topRated', label: 'Top Rated' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'releaseDate', label: 'Release Date' },
  { value: 'rating', label: 'Rating' },
];

export const topTrendingData = [
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '1',
  },
  {
    imageSrc: camera,
    title: 'Travel Buddy',
    subtitle: 'Itinerary Organizer | Adventure ',
    productId: '2',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '6',
  },
  {
    imageSrc: camera,
    title: 'Travel Buddy',
    subtitle: 'Itinerary Organizer | Adventure ',
    productId: '7',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '8',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '9',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '10',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '6',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '6',
  },
];

export const recomendationData = [
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '1',
  },
  {
    imageSrc: camera,
    title: 'Travel Buddy',
    subtitle: 'Itinerary Organizer | Adventure',
    productId: '2',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '1',
  },
  {
    imageSrc: camera,
    title: 'Travel Buddy',
    subtitle: 'Itinerary Organizer | Adventure',
    productId: '2',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '1',
  },
  {
    imageSrc: camera,
    title: 'Travel Buddy',
    subtitle: 'Itinerary Organizer | Adventure',
    productId: '2',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
  {
    imageSrc: mindEase,
    title: 'MindEase',
    subtitle: 'Meditation | Mental Wellness',
    productId: '1',
  },
  {
    imageSrc: camera,
    title: 'Travel Buddy',
    subtitle: 'Itinerary Organizer | Adventure',
    productId: '2',
  },
  {
    imageSrc: phone,
    title: 'Smart Life',
    subtitle: 'Focus | Time management | Course',
    productId: '5',
  },
  {
    imageSrc: men,
    title: 'Finance Guru',
    subtitle: 'Insights | Expense Tracking',
    productId: '3',
  },
  {
    imageSrc: brain,
    title: 'Jet Brains',
    subtitle: 'AI | Strategy | Apply',
    productId: '4',
  },
];

export const moviesData = [
  {
    imageSrc: openheimar,
    title: 'Oppenheimer',
    subtitle: 'Action | Adventure | Comedy',
    productId: '1',
  },
  {
    imageSrc: deadpool,
    title: 'Deadpool & Wolverine',
    subtitle: 'Action | Adventure | Comedy',
    productId: '2',
  },
  {
    imageSrc: imax,
    title: 'Godzilla vs Kong',
    subtitle: 'Action | Adventure | Comedy',
    productId: '3',
  },
  {
    imageSrc: squidGame,
    title: 'Squid Game',
    subtitle: 'Action | Adventure | Comedy',
    productId: '4',
  },
  {
    imageSrc: mendalorian,
    title: 'Mandalorian',
    subtitle: 'Action | Adventure | Comedy',
    productId: '5',
  },
  {
    imageSrc: openheimar,
    title: 'Oppenheimer',
    subtitle: 'Action | Adventure | Comedy',
    productId: '1',
  },
  {
    imageSrc: deadpool,
    title: 'Deadpool & Wolverine',
    subtitle: 'Action | Adventure | Comedy',
    productId: '2',
  },
  {
    imageSrc: imax,
    title: 'Godzilla vs Kong',
    subtitle: 'Action | Adventure | Comedy',
    productId: '3',
  },
  {
    imageSrc: squidGame,
    title: 'Squid Game',
    subtitle: 'Action | Adventure | Comedy',
    productId: '4',
  },
  {
    imageSrc: mendalorian,
    title: 'Mandalorian',
    subtitle: 'Action | Adventure | Comedy',
    productId: '5',
  },
  {
    imageSrc: imax,
    title: 'Godzilla vs Kong',
    subtitle: 'Action | Adventure | Comedy',
    productId: '3',
  },
  {
    imageSrc: squidGame,
    title: 'Squid Game',
    subtitle: 'Action | Adventure | Comedy',
    productId: '4',
  },
  {
    imageSrc: mendalorian,
    title: 'Mandalorian',
    subtitle: 'Action | Adventure | Comedy',
    productId: '5',
  },
  {
    imageSrc: openheimar,
    title: 'Oppenheimer',
    subtitle: 'Action | Adventure | Comedy',
    productId: '1',
  },
  {
    imageSrc: deadpool,
    title: 'Deadpool & Wolverine',
    subtitle: 'Action | Adventure | Comedy',
    productId: '2',
  },
  {
    imageSrc: imax,
    title: 'Godzilla vs Kong',
    subtitle: 'Action | Adventure | Comedy',
    productId: '3',
  },
  {
    imageSrc: squidGame,
    title: 'Squid Game',
    subtitle: 'Action | Adventure | Comedy',
    productId: '4',
  },
  {
    imageSrc: mendalorian,
    title: 'Mandalorian',
    subtitle: 'Action | Adventure | Comedy',
    productId: '5',
  },
  {
    imageSrc: openheimar,
    title: 'Oppenheimer',
    subtitle: 'Action | Adventure | Comedy',
    productId: '1',
  },
  {
    imageSrc: deadpool,
    title: 'Deadpool & Wolverine',
    subtitle: 'Action | Adventure | Comedy',
    productId: '2',
  },
];

export const coursesData = [
  {
    imageSrc: uiUx,
    title: 'Mastering UI & IX Design',
    subtitle: 'Design | Development | App',
    productId: '1',
  },
  {
    imageSrc: lab,
    title: 'Micro Biology',
    subtitle: 'Cells | Science | Research',
    productId: '2',
  },
  {
    imageSrc: vr,
    title: 'Augmented Reality',
    subtitle: 'AR/VR | Training | Vision Pro',
    productId: '3',
  },
  {
    imageSrc: architecture,
    title: 'Architecture: 101',
    subtitle: 'Structues | Out of box | Learn',
    productId: '4',
  },
  {
    imageSrc: digitalMarketing,
    title: 'Online Digital Marketing',
    subtitle: 'Marketing | Social media | Digital',
    productId: '5',
  },
  {
    imageSrc: uiUx,
    title: 'Mastering UI & IX Design',
    subtitle: 'Design | Development | App',
    productId: '1',
  },
  {
    imageSrc: lab,
    title: 'Micro Biology',
    subtitle: 'Cells | Science | Research',
    productId: '2',
  },
  {
    imageSrc: vr,
    title: 'Augmented Reality',
    subtitle: 'AR/VR | Training | Vision Pro',
    productId: '3',
  },
  {
    imageSrc: architecture,
    title: 'Architecture: 101',
    subtitle: 'Structues | Out of box | Learn',
    productId: '4',
  },
  {
    imageSrc: digitalMarketing,
    title: 'Online Digital Marketing',
    subtitle: 'Marketing | Social media | Digital',
    productId: '5',
  },
  {
    imageSrc: architecture,
    title: 'Architecture: 101',
    subtitle: 'Structues | Out of box | Learn',
    productId: '4',
  },
  {
    imageSrc: digitalMarketing,
    title: 'Online Digital Marketing',
    subtitle: 'Marketing | Social media | Digital',
    productId: '5',
  },
  {
    imageSrc: uiUx,
    title: 'Mastering UI & IX Design',
    subtitle: 'Design | Development | App',
    productId: '1',
  },
  {
    imageSrc: lab,
    title: 'Micro Biology',
    subtitle: 'Cells | Science | Research',
    productId: '2',
  },
  {
    imageSrc: vr,
    title: 'Augmented Reality',
    subtitle: 'AR/VR | Training | Vision Pro',
    productId: '3',
  },
  {
    imageSrc: architecture,
    title: 'Architecture: 101',
    subtitle: 'Structues | Out of box | Learn',
    productId: '4',
  },
  {
    imageSrc: architecture,
    title: 'Architecture: 101',
    subtitle: 'Structues | Out of box | Learn',
    productId: '4',
  },
  {
    imageSrc: digitalMarketing,
    title: 'Online Digital Marketing',
    subtitle: 'Marketing | Social media | Digital',
    productId: '5',
  },
  {
    imageSrc: uiUx,
    title: 'Mastering UI & IX Design',
    subtitle: 'Design | Development | App',
    productId: '1',
  },
  {
    imageSrc: lab,
    title: 'Micro Biology',
    subtitle: 'Cells | Science | Research',
    productId: '2',
  },
  {
    imageSrc: vr,
    title: 'Augmented Reality',
    subtitle: 'AR/VR | Training | Vision Pro',
    productId: '3',
  },
  {
    imageSrc: architecture,
    title: 'Architecture: 101',
    subtitle: 'Structues | Out of box | Learn',
    productId: '4',
  },
];

export const servicesData = [
  {
    imageSrc: homeCleaning,
    title: 'Home Cleaning',
    subtitle: 'Deep cleaning | Plants | Machine wash',
    productId: '1',
  },
  {
    imageSrc: audit,
    title: 'Texas Audit',
    subtitle: 'Tax | Records | Filing | Profits',
    productId: '2',
  },
  {
    imageSrc: builders,
    title: 'Phoenix Builders & Co',
    subtitle: 'Industry | Contractor',
    productId: '3',
  },
  {
    imageSrc: movingBuddy,
    title: 'Moving Buddy',
    subtitle: 'Packaging | Delivery } Transport ',
    productId: '4',
  },
  {
    imageSrc: lawFirm,
    title: 'McCoy Law Firm',
    subtitle: 'Law | Legal Services | Immigration',
    productId: '5',
  },
  {
    imageSrc: homeCleaning,
    title: 'Home Cleaning',
    subtitle: 'Deep cleaning | Plants | Machine wash',
    productId: '1',
  },
  {
    imageSrc: audit,
    title: 'Texas Audit',
    subtitle: 'Tax | Records | Filing | Profits',
    productId: '2',
  },
  {
    imageSrc: builders,
    title: 'Phoenix Builders & Co',
    subtitle: 'Industry | Contractor',
    productId: '3',
  },
  {
    imageSrc: movingBuddy,
    title: 'Moving Buddy',
    subtitle: 'Packaging | Delivery } Transport ',
    productId: '4',
  },
  {
    imageSrc: lawFirm,
    title: 'McCoy Law Firm',
    subtitle: 'Law | Legal Services | Immigration',
    productId: '5',
  },
  {
    imageSrc: audit,
    title: 'Texas Audit',
    subtitle: 'Tax | Records | Filing | Profits',
    productId: '2',
  },
  {
    imageSrc: builders,
    title: 'Phoenix Builders & Co',
    subtitle: 'Industry | Contractor',
    productId: '3',
  },
  {
    imageSrc: movingBuddy,
    title: 'Moving Buddy',
    subtitle: 'Packaging | Delivery } Transport ',
    productId: '4',
  },
  {
    imageSrc: lawFirm,
    title: 'McCoy Law Firm',
    subtitle: 'Law | Legal Services | Immigration',
    productId: '5',
  },
  {
    imageSrc: homeCleaning,
    title: 'Home Cleaning',
    subtitle: 'Deep cleaning | Plants | Machine wash',
    productId: '1',
  },
  {
    imageSrc: audit,
    title: 'Texas Audit',
    subtitle: 'Tax | Records | Filing | Profits',
    productId: '2',
  },
  {
    imageSrc: audit,
    title: 'Texas Audit',
    subtitle: 'Tax | Records | Filing | Profits',
    productId: '2',
  },
  {
    imageSrc: builders,
    title: 'Phoenix Builders & Co',
    subtitle: 'Industry | Contractor',
    productId: '3',
  },
  {
    imageSrc: movingBuddy,
    title: 'Moving Buddy',
    subtitle: 'Packaging | Delivery } Transport ',
    productId: '4',
  },
  {
    imageSrc: lawFirm,
    title: 'McCoy Law Firm',
    subtitle: 'Law | Legal Services | Immigration',
    productId: '5',
  },
  {
    imageSrc: homeCleaning,
    title: 'Home Cleaning',
    subtitle: 'Deep cleaning | Plants | Machine wash',
    productId: '1',
  },
  {
    imageSrc: audit,
    title: 'Texas Audit',
    subtitle: 'Tax | Records | Filing | Profits',
    productId: '2',
  },
];

export const convertToLocalISOString = dateString => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = '00';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 50,
    border: '1px solid var(--outline, #6C8CFF80)',
    backgroundColor: 'rgba(4, 4, 4, 0.20)',
    minHeight: 50,
    paddingLeft: 8,
  }),
  singleValue: provided => ({
    ...provided,
    color: '#FFFF',
    paddingLeft: 8,
  }),
  placeholder: provided => ({
    ...provided,
    color: '#FFFFFF99',
    paddingLeft: 8,
  }),
  menu: provided => ({
    ...provided,
    background: 'rgba(4, 4, 4)',
    borderRadius: 10,
    padding: 0,
  }),
  menuList: provided => ({
    ...provided,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? 'rgba(167, 104, 253, 0.8)' : 'rgba(4, 4, 4)',
    color: '#FFFFFF99',
    padding: '8px 12px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export const fetchSingleProduct = async locId => {
  try {
    let token = getCookies('authToken');
    const response = await axios.get(
      `https://api.lusso.dev/api/v1/products/${locId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // params: {
        //   productId: locId,
        // },
      },
    );
    console.log('res', response);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};


export const negativeNumberValidation = (value) => {
return value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)
}

export const isValidPrice = (value) => {
  const num = parseFloat(value);
  // Ensure it's a valid number and non-negative
  return !isNaN(num) && num >= 0;
};
