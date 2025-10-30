"use client";

import React, { ReactNode } from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
  content?: string | ReactNode;
  variant?: "primary" | "secondary" | "outline";
  title?: string;
  icon?: ReactNode;
  primary?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  bgColor,
  textColor,
  content,
  variant = "primary",
  className,
  title,
  icon,
  primary,
  ...props
}) => {
  // If primary prop is provided, use it to set variant
  if (primary !== undefined) {
    variant = primary ? "primary" : "secondary";
  }

  // If bgColor and textColor are provided (mobile app style), use them
  if (bgColor && textColor) {
    return (
      <button
        className={`mt-spacing rounded-xl py-spacing text-center text-medium font-normal transition-all duration-200 hover:scale-[0.98] active:scale-[0.96] shadow-button ${className}`}
        style={{ 
          backgroundColor: bgColor,
          color: textColor,
        }}
        {...props}
      >
        {icon && <span className="inline-block mr-2">{icon}</span>}
        {content || title || children}
      </button>
    );
  }

  // Default variant-based styling
  const baseClasses = "mt-spacing px-spacing-2 py-spacing rounded-xl text-medium font-normal transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-[0.96]";
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-text-white shadow-button",
    secondary: "bg-secondary hover:bg-secondary-dark text-text-primary",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary-light",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {title || content || children}
    </button>
  );
};

export default CustomButton;