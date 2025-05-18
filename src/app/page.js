'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 text-gray-950">
        <ProductList />
      </main>
    </>
  );
}
