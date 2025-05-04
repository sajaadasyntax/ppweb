"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import AppTextInput from "@/components/AppTextInput";
import CustomButton from "@/components/CustomButton";
import { IoAttach, IoCheckmarkCircle } from "react-icons/io5";

const reportTypes = [
  "تقرير نشاط",
  "تقرير مالي",
  "تقرير إنجاز",
  "تقرير مشروع",
  "تقرير أداء",
  "أخرى",
];

export default function SubmitReport() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    type: "تقرير نشاط",
    description: "",
    date: "",
    attachmentName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  if (!authContext?.token) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        attachmentName: e.target.files?.[0].name || "",
      }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        
        // Reset form after 3 seconds
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
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary p-6 rounded-b-3xl">
          <h1 className="text-2xl font-bold text-white text-center">تقديم التقارير</h1>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <IoCheckmarkCircle className="text-green-600" size={48} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">تم تقديم التقرير بنجاح</h2>
            <p className="text-text-secondary mb-6">
              شكراً لك. سيتم مراجعة التقرير والرد عليه في أقرب وقت.
            </p>
            <CustomButton onClick={() => setSubmitted(false)}>تقديم تقرير آخر</CustomButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">تقديم التقارير</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-primary mb-6">نموذج تقديم التقرير</h2>
          
          <form onSubmit={handleSubmit}>
            <AppTextInput
              label="عنوان التقرير"
              name="title"
              placeholder="أدخل عنوان التقرير"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />
            
            <div className="mb-4">
              <label className="block text-text-primary mb-2 text-sm font-medium">
                نوع التقرير
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-4 rounded-lg border border-gray-300 text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {reportTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-text-primary mb-2 text-sm font-medium">
                وصف التقرير
              </label>
              <textarea
                name="description"
                placeholder="اكتب وصفاً مفصلاً للتقرير"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full p-4 rounded-lg border ${
                  errors.description
                    ? "border-error text-error"
                    : "border-gray-300 text-text-primary"
                } bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-error">{errors.description}</p>
              )}
            </div>
            
            <AppTextInput
              label="تاريخ التقرير"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
            />
            
            <div className="mb-6">
              <label className="block text-text-primary mb-2 text-sm font-medium">
                المرفقات (اختياري)
              </label>
              <div className="flex items-center">
                <label className="flex items-center justify-center px-4 py-2 bg-gray-100 text-text-secondary rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <IoAttach className="ml-2" />
                  <span>اختر ملفاً</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {formData.attachmentName && (
                  <span className="mr-3 text-text-primary">
                    {formData.attachmentName}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <CustomButton 
                type="submit" 
                className="w-full" 
                disabled={submitting}
              >
                {submitting ? "جاري الإرسال..." : "تقديم التقرير"}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 