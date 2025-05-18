'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ProductDetailsModal from './ProductDetailsModal';
import HoverTooltip from './HoverTooltip';
import { Button } from './ui/button';


// Truncate long descriptions to fit within the tooltip
function truncate(str, maxLength = 100) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '...';
}


export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.productId === product.id);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-md shadow-sm p-4 flex flex-col hover:shadow-md transition-shadow duration-300">
        <HoverTooltip 
          maxWidth={400}
          content={
            <>
              <p className="text-xs line-clamp-2 mb-2 mt-3">{truncate(product.description, 100)}</p>
            </>
          }
        >
          <img
            src={product.image}
            alt={product.title}
            className="cursor-pointer w-full h-48 object-contain"
            onClick={() => setModalOpen(true)}
          />
        </HoverTooltip>

        <h3 className="text-sm font-semibold line-clamp-2 mb-2 mt-3">{product.title}</h3>
        <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
        <Button
          onClick={() => dispatch(addToCart(product))}
          disabled={isInCart}
          className={`mt-auto py-2 rounded-md text-white ${
            isInCart ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-500'
          } transition-colors duration-300`}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </div>

      {/* Product details modal */}
      {modalOpen && (
        <ProductDetailsModal
          product={product}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
