"use client";

import React from "react";

interface AppTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-text-primary mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className={`w-full p-4 rounded-lg border ${
          error
            ? "border-error text-error"
            : "border-gray-300 text-text-primary"
        } bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default AppTextInput; 