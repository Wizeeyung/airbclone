"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>
  errors: FieldErrors;
  validate?: any;
  value?: string | number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void;
}


const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  validate,
  value,
  handleChange
}) => {



  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2"/>
      )}

      <input 
        id={id}
        disabled={disabled}
        {...register(id, {required, ...validate})}
        //make sure there is space on the placeholder
        placeholder=" "
        type={type}
        value={value}
        className={
          // peer class is use to control what happens in the label on various actions that happens in the input field
          `peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition
          disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-500"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          `
        }
        onChange={handleChange}
      />

      <label 
        className={`
            absolute
            text-md
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            ${formatPrice ? "left-9" : "left-4"}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id]? "text-rose-500" : "text-zinc-400"}
          `}
      >
        {label}
      </label>

      {/* Conditionally render the error message */}
      {errors[id]?.message && (
        <p className="text-rose-500 text-sm mt-1">
          {`${errors[id].message}`}
        </p>
      )}
    </div>
  )
}

export default Input