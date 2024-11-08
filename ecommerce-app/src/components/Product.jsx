import React from 'react';
import './Product.css';
const Product = ({ product, onAddToCart }) => (
  <div className="product">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>Prix: ${product.price}</p>
    <button onClick={() => onAddToCart(product)}>Ajouter au Panier</button>
  </div>
);

export default Product;
