'use client';

import React, { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../store/cartSlice';
import { Button } from './ui/button';

const Cart = forwardRef(({ isOpen }, ref) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce(
    (total, item) => total + item.productData.price * item.quantity,
    0
  );

  return (
    <div
      ref={ref}
      className={`fixed top-0 right-0 h-full w-80 bg-white text-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            className="text-red-600 hover:text-red-800 font-bold"
            onClick={() => dispatch(clearCart())}
            disabled={items.length === 0}
          >
            Clear All
          </button>
        </div>

        <div className="flex-grow overflow-auto px-4 py-2">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))
          )}
        </div>

        {/* Total Price */}
        <div className="px-4 py-4 border-t bg-gray-50">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Button className='p-2 m-3 bg-blue-700 text-white'>Checkout</Button>
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;
