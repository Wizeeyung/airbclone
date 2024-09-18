"use client";

import { IconType } from "react-icons";
import ClipLoader from "react-spinners/ClipLoader";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  className,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        flex
        justify-center
        items-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        ${small ? "py-1 px-3 text-sm" : "py-2 px-4"}
        ${outline ? " border-black border-[1px] text-black bg-white" : "bg-rose-500 border-rose-500 text-white"}
        ${className} /* Custom styles applied last */
      `}
    >
      {Icon && <Icon size={24} className="mr-2" />}
      {disabled && (
        <ClipLoader
        color="white"
        loading
        size={16}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="mr-2"
      />
      )}
      {label}
    </button>
  );
};

export default Button;
