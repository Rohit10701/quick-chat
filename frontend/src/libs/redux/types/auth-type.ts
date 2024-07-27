
export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse =
  {
    user_id : string;
    username : string;
    email : string;
    accessToken : string;
  }

export type SingupParams = {
  email: string;
  password: string;
};

export type SignupResponse =
{
  user_id : string;
  username : string;
  email : string;
}
