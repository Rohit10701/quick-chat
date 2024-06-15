"use client";

import LoginFooter from "@/components/auth/login-footer";
import LoginForm from "@/components/auth/login-form";
import Input from "@/components/base/Input";
import { login } from "@/libs/redux/actions/auth-action";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { RootState } from "@/libs/redux/store";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  return(
    <>
      <LoginForm />
      {/* <LoginFooter /> */}
    </>
  )
}
