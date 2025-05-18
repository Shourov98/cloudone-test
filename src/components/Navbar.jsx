'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice.js';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import Cart from './Cart';
import Link from 'next/link.js';

export default function Navbar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const cartItems = useSelector((state) => state.cart.items);

  const [isCartOpen, setCartOpen] = useState(false);
  const cartRef = useRef();

  // Toggle cart sidebar
  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  // Close cart if click outside sidebar and cart icon
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.closest('#cart-icon')
      ) {
        setCartOpen(false);
      }
    }

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 text-gray-800 bg-white shadow-md z-50 flex items-center justify-between px-4 sm:px-8 h-16">
        {/* Left side - empty for now */}
        <Link
          href="/"
          className="w-25 text-3xl font-extrabold tracking-wide text-blue-600 hover:text-blue-700 transition-colors"
        >
          Fakestore
        </Link>

        {/* Center search bar */}
        <div className="flex-grow mx-4 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-6">
          <button
            id="cart-icon"
            aria-label="Toggle Cart"
            onClick={toggleCart}
            className="relative focus:outline-none"
          >
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          <FaUserCircle size={28} className="text-gray-600" />
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} ref={cartRef} />
    </>
  );
}
