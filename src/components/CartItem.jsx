'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../store/cartSlice';
import ProductDetailsModal from './ProductDetailsModal';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { productData, quantity, productId } = item;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-4 border-b py-3">
        <img
          src={productData.image}
          alt={productData.title}
          className="w-16 h-16 object-contain"
          onClick={() => setModalOpen(true)}
        />
        <div className="flex-grow">
          <h3 className="text-sm font-semibold line-clamp-2">{productData.title}</h3>
          <p className="text-gray-600">${productData.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(decreaseQuantity(productId))}
            disabled={quantity === 1}
            className={`w-6 h-6 flex items-center justify-center border rounded ${
              quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            -
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={() => dispatch(increaseQuantity(productId))}
            className="w-6 h-6 flex items-center justify-center border rounded"
          >
            +
          </button>
        </div>

        <button
          onClick={() => dispatch(removeFromCart(productId))}
          className="text-red-600 hover:text-red-800 font-bold"
          aria-label="Remove item"
        >
          &#10005;
        </button>
      </div>
      {/* Product details modal */}
      {modalOpen && (
        <ProductDetailsModal
          product={productData}
          onClose={() => setModalOpen(false)}
        />
      )}
    
    </>
  );
}
