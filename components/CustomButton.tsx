"use client";

import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200";
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark",
    secondary: "bg-secondary hover:bg-secondary-dark",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary/10",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton; 