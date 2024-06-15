import { User, Session, WeakPassword } from "@supabase/supabase-js";

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse =
  | {
      user: User;
      session: Session;
      weakPassword?: WeakPassword | undefined;
    }
  | {
      user: null;
      session: null;
      weakPassword?: null | undefined;
    };

export type SingupParams = {
  email: string;
  password: string;
};

export type SignupResponse =
  | {
      user: User;
      session: Session | null;
      error?: null | undefined;
    }
  | {
      user: null;
      session: null;
      weakPassword?: WeakPassword;
    };
