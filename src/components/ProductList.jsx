'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/productSlice';
import ProductCard from './ProductCard';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const searchQuery = useSelector((state) => state.search.query.toLowerCase());

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

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
    // Wrapper div to control max width and center grid
    <div className="bg-gray-200 py-6">
      <div className="max-w-[60vw] mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
