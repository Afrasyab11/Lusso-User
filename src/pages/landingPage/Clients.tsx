import React from 'react';
import apple from '../../assets/images/home/apple.png';
import google from '../../assets/images/home/google.png';
import ibm from '../../assets/images/home/ibm.png';
import meta from '../../assets/images/home/meta.png';
import microsoft from '../../assets/images/home/microsoft.png';
import paypal from '../../assets/images/home/paypal.png';
import samsung from '../../assets/images/home/samsung.png';
import LogoSlider from '../../components/common/LogoSlider';

// Example logos
const logos = [
  google,
  microsoft,
  apple,
  ibm,
  samsung,
  meta,
  paypal,
];

const Clients: React.FC = () => {
  return (
    <div>
      <LogoSlider logos={logos} />
    </div>
  );
};


export default Clients