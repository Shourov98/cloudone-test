import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});
