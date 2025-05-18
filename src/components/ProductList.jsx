'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/productSlice';
import ProductCard from './ProductCard';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const searchQuery = useSelector((state) => state.search.query.toLowerCase());

  // New state: how many products to show initially
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  // Filter and slice for lazy loading
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (status === 'loading') {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center py-10 text-red-600">{error}</p>;
  }

  if (filteredProducts.length === 0) {
    return <p className="text-center py-10">No products found.</p>;
  }

  return (
    <div className="bg-gray-200 py-6">
      <div className="mx-auto max-w-full lg:max-w-[60vw] md:max-w-[80vw] px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((count) => count + 12)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
