import { combineReducers } from '@reduxjs/toolkit';
import ecommerceReducer from './EcommerceReducer';

const rootReducer = combineReducers({
  ecommerce: ecommerceReducer,
});

export default rootReducer;
