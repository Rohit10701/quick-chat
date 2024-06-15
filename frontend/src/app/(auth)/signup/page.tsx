"use client";
import SignupForm from "@/components/auth/signup-form";
import { createClient } from "@/utils/supabase/client";
import React, { FormEventHandler, useState } from "react";

const Page = () => {
  return (
    <>
      <SignupForm />
    </>
  )
};

export default Page;
