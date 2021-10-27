import { configureStore } from '@reduxjs/toolkit';
import parserReducer from '../features/parser/parserSlice';

export const store = configureStore({
  reducer: {
    parser: parserReducer
  },
});
