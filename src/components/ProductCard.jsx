'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.productId === product.id);

  return (
    <div className="border-none bg-white rounded-md shadow-sm p-4 flex flex-col hover:shadow-md transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-sm font-semibold line-clamp-2 mb-2">{product.title}</h3>
      <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        disabled={isInCart}
        className={`mt-auto py-2 rounded-md text-white ${
          isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors duration-300`}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
