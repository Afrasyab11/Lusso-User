import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null; // This component doesn't render anything, it's just used to trigger the effect
};

export default ScrollToTop;
