import React, { forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/tailwind/merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<FieldValues>;
  className?: string;
  label? : string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ name, register, className, label, ...rest }, ref) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} className={cn(`w-48 h-11 rounded-md`, className)} ref={ref} {...rest} />
    </>
  );
});
Input.displayName = "Input"
export default Input;
