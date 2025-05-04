"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AppTextInput from "@/components/AppTextInput";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In a real app, this would make an API call
      // For this example, we'll just simulate a successful login
      if (email && password) {
        await authContext?.login("fake-token");
        router.push("/");
      } else {
        setError("جميع الحقول مطلوبة");
      }
    } catch (error) {
      setError("فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">تسجيل الدخول</h1>
            <p className="text-text-secondary mt-2">
              أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-error p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AppTextInput
              label="البريد الإلكتروني"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <AppTextInput
              label="كلمة المرور"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <div className="mt-6">
              <CustomButton
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "جاري التحميل..." : "تسجيل الدخول"}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 