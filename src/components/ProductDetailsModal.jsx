'use client';

import React, { useEffect } from 'react';

export default function ProductDetailsModal({ product, onClose }) {
  // Close modal on ESC key press
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>

          <div className="flex space-x-3 flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
            {/* Left: bigger product image */}
            <div className="flex-shrink-0 md:w-2/3">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain rounded"
              />
            </div>

            {/* Right: smaller details */}
            <div className="md:w-1/3 flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
              <p className="text-xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="mb-4 text-gray-700">{product.description}</p>

              <div className="mt-auto">
                <p className="font-semibold">Rating:</p>
                <div className="flex items-center space-x-2">
                  <span>{product.rating?.rate ?? 'N/A'}</span>
                  <span>({product.rating?.count ?? 0} reviews)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
