"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Voting() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("electoral");

  useEffect(() => {
    // Only redirect after hydration is complete
    if (authContext?.isHydrated && !authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, authContext?.isHydrated, router]);

  // Show loading state while hydrating
  if (!authContext?.isHydrated) {
    return <LoadingSpinner />;
  }

  if (!authContext?.token) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "electoral":
        return (
          <div className="mt-spacing-2">
            <div className="bg-background rounded-xl shadow-card p-spacing-2 mb-spacing border border-gray-light">
              <h2 className="text-large font-bold text-primary mb-3">انتخابات المجلس التنفيذي 2024</h2>
              <p className="text-text-primary mb-spacing">انتخابات لاختيار أعضاء المجلس التنفيذي للفترة القادمة 2024-2026</p>
              <div className="flex justify-between items-center mt-spacing">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-bold">15 يونيو 2024</span>
                </div>
                <Link href="/voting/electoral/1">
                  <CustomButton>المشاركة في التصويت</CustomButton>
                </Link>
              </div>
            </div>

            <div className="bg-background rounded-xl shadow-card p-spacing-2 border border-gray-light">
              <h2 className="text-large font-bold text-primary mb-3">انتخابات اللجنة الثقافية 2024</h2>
              <p className="text-text-primary mb-spacing">انتخابات لاختيار أعضاء اللجنة الثقافية للعام 2024</p>
              <div className="flex justify-between items-center mt-spacing">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-bold">30 يونيو 2024</span>
                </div>
                <Link href="/voting/electoral/2">
                  <CustomButton>المشاركة في التصويت</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        );
      
      case "opinion":
        return (
          <div className="mt-spacing-2">
            <div className="bg-background rounded-xl shadow-card p-spacing-2 mb-spacing border border-gray-light">
              <h2 className="text-large font-bold text-primary mb-3">استطلاع رأي: مكان الاحتفال السنوي</h2>
              <p className="text-text-primary mb-spacing">استطلاع لتحديد المكان المناسب للاحتفال السنوي للمؤسسة</p>
              <div className="flex justify-between items-center mt-spacing">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-bold">10 يونيو 2024</span>
                </div>
                <Link href="/voting/opinion/1">
                  <CustomButton>المشاركة في الاستطلاع</CustomButton>
                </Link>
              </div>
            </div>

            <div className="bg-background rounded-xl shadow-card p-spacing-2 border border-gray-light">
              <h2 className="text-large font-bold text-primary mb-3">استطلاع رأي: الميزانية المقترحة</h2>
              <p className="text-text-primary mb-spacing">استطلاع للموافقة على الميزانية المقترحة للعام القادم</p>
              <div className="flex justify-between items-center mt-spacing">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-bold">20 يونيو 2024</span>
                </div>
                <Link href="/voting/opinion/2">
                  <CustomButton>المشاركة في الاستطلاع</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-center py-10">محتوى غير متوفر</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary p-spacing-2 rounded-b-3xl">
        <h1 className="text-large font-bold text-text-white text-center">التصويت</h1>
      </div>
      
      <div className="px-spacing-2 py-spacing-2">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-light">
          <button
            className={`py-3 px-6 font-bold ${
              activeTab === "electoral"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
            onClick={() => setActiveTab("electoral")}
          >
            الانتخابات
          </button>
          <button
            className={`py-3 px-6 font-bold ${
              activeTab === "opinion"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
            onClick={() => setActiveTab("opinion")}
          >
            استطلاعات الرأي
          </button>
        </div>
        
        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
} 