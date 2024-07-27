import { RootState } from '../store';

export const selectChatSession = (state: RootState) => state.chat;

export const selectChatSessionName = (state: RootState) => state.chat.name;
export const selectChatSessionUid = (state: RootState) => state.chat.uid;
export const selectChatSessionPhoto = (state: RootState) => state.chat.photo;
export const selectChatSessionLastSeen = (state: RootState) => state.chat.lastSeen;
