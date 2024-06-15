import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const SOCKET_PORT = process.env.SOCKET_PORT;
export const SUPABASE_URL = process.env.SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
