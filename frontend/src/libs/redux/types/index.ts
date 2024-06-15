import { AuthError } from '@supabase/supabase-js'
import { AppDispatch, RootState } from '../store'


export type AuthThunkApiConfig = {
  dispatch: AppDispatch
  state: RootState
  rejectValue: AuthError | null
}