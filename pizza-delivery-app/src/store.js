import { combineReducers } from 'redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { getAllPizzasReducer } from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducer';
import { loginUserReducer, registerUserReducer } from './reducers/userReducer';



const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
  registerUserReducer:registerUserReducer,
  loginUserReducer: loginUserReducer

});


// Load cart items from local storage
// const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// const initialState = {
//   cartReducer: {
//     cartItems: cartItems,
//   },
// };

const composeEnhancers = composeWithDevTools({});

const store = configureStore({ reducer: finalReducer } , composeEnhancers(applyMiddleware(thunk)));

export default store;
