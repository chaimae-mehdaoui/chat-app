import React from 'react';
import './Cart.css';
const Cart = ({ cart, onUpdateQuantity }) => {
  const handleIncrease = (id) => {
    onUpdateQuantity(id, 1); 
  };

  const handleDecrease = (id) => {
    onUpdateQuantity(id, -1);
  };

  const handleRemove = (id) => {
    onUpdateQuantity(id, -999); 
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleIncrease(item.id)}>+</button>
                <button onClick={() => handleDecrease(item.id)}>-</button>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        <p>
          Total: $
          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Cart;
