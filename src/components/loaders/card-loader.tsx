import React from 'react';
import './styles.scss'; // Ensure you have styles for the skeleton loader

const CardLoader: React.FC = () => {
  return (
    <div className="exploreCard card-container skeleton-loader">
      <div className="flex flex-row justify-center items-center">
        <div className="skeleton skeleton-image" style={{ width: '250px', height: '250px' }}></div>
      </div>
      <div className="flex flex-row gap-x-2">
        <span className="skeleton skeleton-chip"></span>
        <span className="skeleton skeleton-chip"></span>
        <span className="skeleton skeleton-chip"></span>
      </div>
      <div className="flex flex-row gap-x-2">
        <span className="skeleton skeleton-chip"></span>
        <span className="skeleton skeleton-chip"></span>
        <span className="skeleton skeleton-chip"></span>
      </div>
    </div>
  );
};

export default CardLoader;