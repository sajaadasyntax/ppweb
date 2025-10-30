"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AppTextInput from "@/components/AppTextInput";
import CustomButton from "@/components/CustomButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [mobileNumber, setMobileNumber] = useState("900000001");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { login, isLoading, error: authError } = authContext;

  // Show loading state while hydrating
  if (!authContext?.isHydrated) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!mobileNumber || !password) {
      setError("جميع الحقول مطلوبة");
      return;
    }

    try {
      // Add Sudan country code (+249) to the mobile number
      const fullMobileNumber = `+249${mobileNumber}`;
      await login(fullMobileNumber, password);
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "فشل تسجيل الدخول";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background p-spacing-2">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-spacing-3">
          <h1 className="text-xlarge text-primary font-sans mb-spacing-3">
            تسجيل دخول
          </h1>
          <p className="text-large font-bold text-text-primary max-w-[60%] mx-auto text-center font-sans">
            مرحبا بك مرة اخرى
          </p>
        </div>

        {/* Error Display */}
        {(error || authError) && (
          <div className="bg-red-50 text-error p-4 rounded-lg mb-spacing-3">
            {error || authError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mb-spacing-3">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الهاتف
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                +249
              </span>
              <input
                type="tel"
                placeholder="أدخل رقم هاتفك"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                dir="ltr"
              />
            </div>
          </div>

          <AppTextInput
            label="كلمة المرور"
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {/* Forgot Password Link */}
          <div className="text-right mb-spacing-3">
            <button
              type="button"
              className="text-small text-primary font-bold hover:underline font-sans"
            >
              هل نسيت كلمة المرور؟
            </button>
          </div>

          {/* Login Button - Using CustomButton with mobile app styling */}
          <CustomButton
            type="submit"
            bgColor="#1F41BB"
            textColor="#FFFFFF"
            content={isLoading ? "جاري التحميل..." : "دخول"}
            className="w-full text-large font-bold"
            disabled={isLoading}
          />
        </form>

        {/* Register Link */}
        <div className="text-center">
          <button
            type="button"
            className="text-small text-error font-bold hover:underline font-sans p-spacing"
            onClick={() => router.push("/auth/register")}
          >
            إنشاء حساب
          </button>
        </div>

        {/* Debug info */}
        <div className="mt-spacing-4 p-2 bg-gray rounded text-xs">
          <p>Debug: isHydrated = {authContext?.isHydrated ? 'true' : 'false'}</p>
          <p>Debug: isLoading = {isLoading ? 'true' : 'false'}</p>
          <p>Debug: hasToken = {authContext?.token ? 'true' : 'false'}</p>
          <p>Debug: email = &quot;{email}&quot;</p>
          <p>Debug: password = &quot;{password}&quot;</p>
        </div>
      </div>
    </div>
  );
} 