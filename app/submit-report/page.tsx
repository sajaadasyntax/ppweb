"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { apiClient } from "@/context/apiContext";
import AppTextInput from "@/components/AppTextInput";
import CustomButton from "@/components/CustomButton";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ReportFormData {
  title: string;
  type: string;
  description: string;
  date: string;
  attachmentName: string;
}

export default function SubmitReport() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [formData, setFormData] = useState<ReportFormData>({
    title: "",
    type: "تقرير نشاط",
    description: "",
    date: "",
    attachmentName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    // Only redirect after hydration is complete
    if (authContext?.isHydrated && !token) {
      router.push("/auth/login");
    }
  }, [token, authContext?.isHydrated, router]);

  // Show loading state while hydrating
  if (!authContext?.isHydrated) {
    return <LoadingSpinner />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, attachmentName: file.name }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "عنوان التقرير مطلوب";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "وصف التقرير مطلوب";
    }
    
    if (!formData.date) {
      newErrors.date = "تاريخ التقرير مطلوب";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      setApiError(null);
      
      try {
        if (!token) {
          throw new Error("يجب تسجيل الدخول أولاً");
        }
        
        // Call the API to submit the report
        await apiClient.reports.submit(token, formData);
        
        setSubmitted(true);
        
        // Reset form after success
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            title: "",
            type: "تقرير نشاط",
            description: "",
            date: "",
            attachmentName: "",
          });
        }, 3000);
      } catch (error) {
        console.error("Error submitting report:", error);
        setApiError(error instanceof Error ? error.message : "حدث خطأ أثناء إرسال التقرير");
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-right">تقديم تقرير جديد</h1>
      
      {apiError && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-right">
          {apiError}
        </div>
      )}
      
      {submitted ? (
        <div className="bg-green-100 text-green-700 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">تم إرسال التقرير بنجاح</h2>
          <p>شكراً لك. سيتم مراجعة التقرير قريباً.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <AppTextInput
              label="عنوان التقرير"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="أدخل عنوان التقرير"
              error={errors.title}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-right">نوع التقرير</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="تقرير نشاط">تقرير نشاط</option>
              <option value="تقرير مالي">تقرير مالي</option>
              <option value="تقرير مخالفات">تقرير مخالفات</option>
              <option value="اقتراح تطوير">اقتراح تطوير</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-right">وصف التقرير</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="تفاصيل التقرير..."
              className={`w-full p-3 h-32 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              required
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div className="mb-4">
            <AppTextInput
              label="تاريخ التقرير"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-right">إرفاق ملف (اختياري)</label>
            <input 
              type="file"
              onChange={handleFileChange}
              className="block w-full text-gray-500 p-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
            />
          </div>
          
          <div className="flex justify-end">
            <CustomButton 
              type="submit" 
              disabled={submitting}
              className="min-w-32"
            >
              {submitting ? "جاري الإرسال..." : "إرسال التقرير"}
            </CustomButton>
          </div>
        </form>
      )}
    </div>
  );
} 