import { createClient } from "@/utils/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginParams, LoginResponse, SignupResponse, SingupParams } from "../types/auth-type";
import { AuthThunkApiConfig } from "../types";
import { AuthError } from "@supabase/supabase-js";


const supabase = createClient();


export const login = createAsyncThunk<LoginResponse, LoginParams, AuthThunkApiConfig>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {

        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        if (error) {
          return rejectWithValue(error);
        }
        return data;
    }
  );

  export const signup = createAsyncThunk<SignupResponse, SingupParams, AuthThunkApiConfig>(
    'auth/signup',
    async (credentials, { rejectWithValue } : any ) => {

        const { data, error } = await supabase.auth.signUp(credentials);
        if (error) {
          return rejectWithValue(error);
        }
        return data;
    }
  );