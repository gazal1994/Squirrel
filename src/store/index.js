import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';
import usersReducer from './usersSlice'

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer , users: usersReducer, },
});

export default store;
