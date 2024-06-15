import React, { useState } from 'react'
import Input from '../base/Input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/libs/redux/hooks';
import { signup } from '@/libs/redux/actions/auth-action';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleLogin = async () => {
        console.log(formData)
      try {
        await dispatch(signup(formData));
        router.replace("/login")
      } catch (error) {
        console.error("Login error:", error);
      }
    };
    return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="flex flex-col gap-y-2 justify-center items-center mb-6">
          <Image
            src="\icons\messenger-icon.svg"
            height={90}
            width={90}
            alt="icon"
            loading="lazy"
          />
          <p className="text-[2rem] font-extralight">Messenger</p>
          <p>
            <span className="font-medium">Welcome to Messenger</span>,{" "}
            <span className="font-light">Signup to Continue!</span>
          </p>
        </div>
        <form
          className="flex flex-col w-96 gap-y-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            name="email"
            autoComplete='email'
            register={register}
            placeholder="Email..."
            className="w-full h-12 border-[2px] border-[#000] bg-slate-50 rounded-md dark:border-white dark:bg-charcoal px-4 placeholder-smoke"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            name="password"
            register={register}
            placeholder="Password..."
            autoComplete='current-password'
            className="w-full h-12 border-[2px] border-[#000] bg-slate-50 rounded-md dark:border-white dark:bg-charcoal px-4 placeholder-smoke"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-msgblue w-96 h-12 rounded-md font-medium mt-6"
          >
            Sign up
          </button>
        </form>
      </div>
    );
}

export default SignupForm