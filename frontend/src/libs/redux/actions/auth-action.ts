import { createClient } from '@/utils/supabase/client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginParams, LoginResponse, SignupResponse, SingupParams } from '../types/auth-type'
import { AuthThunkApiConfig } from '../types'
import axios, { AxiosError, AxiosResponse } from 'axios'

const supabase = createClient()

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_USER_MS}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials)
		});
		
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		
		const data: LoginResponse = await response.json();
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(JSON.stringify(error.response?.data || error.message))
		}
	}
})

export const signup = createAsyncThunk(
	'auth/signup',
	async (credentials, thunkAPI) => {
		try {
      const data: AxiosResponse<SignupResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_USER_MS}/auth/login`,
        credentials
      )
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(JSON.stringify(error.response?.data || error.message))
      }
    }
	}
)
