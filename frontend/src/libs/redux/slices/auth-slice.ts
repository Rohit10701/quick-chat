import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { login, signup } from '../actions/auth-action'; // Import both actions
import { AxiosError } from 'axios';
import { LoginResponse } from '../types/auth-type';

type AuthState = {
  isLoggedIn: boolean;
  user?: LoginResponse | null;
  loading?: boolean;
  error?: SerializedError | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // reducer for login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const  data  = action.payload?.data;
        state.loading = false;
        state.user = data;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
      })


      // reducer for signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const authReducer = authSlice.reducer;
