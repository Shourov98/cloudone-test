'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ProductDetailsModal({ product, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="md:w-1/2 flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
              <p className="text-xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
              <p className="mb-2 font-medium text-sm text-gray-700">{product.category}</p>
              <p className="mb-4 text-sm text-gray-600">{product.description}</p>
              <div className="mt-auto text-sm">
                <p className="font-semibold">Rating:</p>
                <p>{product.rating?.rate ?? 'N/A'} ({product.rating?.count ?? 0} reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
