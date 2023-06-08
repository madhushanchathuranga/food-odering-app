import React, { useState } from 'react';

const BikeDeliveryPage = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handleDeliveryInstructionsChange = (e) => {
    setDeliveryInstructions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform necessary actions with the delivery information
    // For example, send a request to the server or update the state in the parent component

    // Clear the form fields
    setDeliveryAddress('');
    setDeliveryTime('');
    setDeliveryInstructions('');
  };

  return (
    <div>
      <h2>Bike Delivery</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Delivery Address:</label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={handleDeliveryAddressChange}
            required
          />
        </div>
        <div>
          <label>Delivery Time:</label>
          <input
            type="text"
            value={deliveryTime}
            onChange={handleDeliveryTimeChange}
            required
          />
        </div>
        <div>
          <label>Delivery Instructions:</label>
          <textarea
            value={deliveryInstructions}
            onChange={handleDeliveryInstructionsChange}
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default BikeDeliveryPage;
