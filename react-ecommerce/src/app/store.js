import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../reducers/app.reducer';

export const store = configureStore({
  reducer: {
    ecommerceReducer:appReducer
  },
});
