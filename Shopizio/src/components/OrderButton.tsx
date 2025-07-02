import React, { useState } from 'react';

interface OrderButtonProps {
  onPlaceOrder: () => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({ onPlaceOrder }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        onPlaceOrder();
        setIsAnimating(false);
      }, 10000);
    }
  };

  return (
    <button 
      className={`order-button ${isAnimating ? 'animate' : ''}`}
      onClick={handleClick}
      disabled={isAnimating}
    >
      <span className="default">Complete Order</span>
      <span className="success">
        Order Placed
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <div className="box"></div>
      <div className="truck">
        <div className="back"></div>
        <div className="front">
          <div className="window"></div>
        </div>
        <div className="light top"></div>
        <div className="light bottom"></div>
      </div>
      <div className="lines"></div>
    </button>
  );
};

export default OrderButton;