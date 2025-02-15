import {configureStore} from '@reduxjs/toolkit';
import exploreReducer from './explore/exploreSlice';
import socialAnalyticsReducer from './socialAnalytics/socialAnalyticSlice';
import generatePostSlice from "./createAI/generatePostSlice"
import productSlice from "./product/productSlice"
export const store = configureStore({
  reducer: {
    explore: exploreReducer,
    socialAnalytics: socialAnalyticsReducer,
    aiPost: generatePostSlice,
    product: productSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
