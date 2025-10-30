"use client";

import React, { ReactNode, useState } from "react";

interface AppTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div className="mb-spacing w-full">
      {label && (
        <label className="block text-text-primary mb-2 text-small font-bold">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-dark">
            {icon}
          </div>
        )}
        <input
          className={`w-full font-sans text-small bg-primary-light rounded-spacing p-spacing-2 my-spacing text-text-primary placeholder-text-secondary transition-all duration-200 border-0 outline-none ${
            focused 
              ? 'border-[3px] border-primary shadow-[4px_10px_10px_rgba(31,65,187,0.2)]' 
              : 'border-0'
          } ${icon ? 'pr-10' : ''} ${className}`}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-small text-error">{error}</p>}
    </div>
  );
};

export default AppTextInput; 