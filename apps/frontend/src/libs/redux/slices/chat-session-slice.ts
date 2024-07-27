import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ChatSessionState = {
  name?: string | null;
  uid?: string | null;
  photo?: string | null;
  lastSeen?: string | null;
};

const initialState: ChatSessionState = {};

const chatSessionSlice = createSlice({
  name: 'chatSession',
  initialState,
  reducers: {
    activateSession: (state, action: PayloadAction<ChatSessionState>) => {
      return { ...state, ...action.payload };
    },
    deactivateSession: (state) => {
      return {};
    },
  },
});

export const { activateSession, deactivateSession } = chatSessionSlice.actions;
export const chatSessionReducer = chatSessionSlice.reducer;
