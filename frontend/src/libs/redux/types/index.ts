import { SerializedError } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import { AxiosError } from 'axios'


export type AuthThunkApiConfig = {
  dispatch: AppDispatch
  state: RootState
  rejectValue: SerializedError | null
}