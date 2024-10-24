// src/store/store.js

import { createStore, combineReducers } from 'redux';
import customizationReducer from './customizationReducer';

// Menggabungkan reducer, jika ada lebih dari satu
const rootReducer = combineReducers({
  customization: customizationReducer
});

// Membuat Redux store
const store = createStore(rootReducer);

export default store;
