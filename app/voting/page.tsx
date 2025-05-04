"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

export default function Voting() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("electoral");

  useEffect(() => {
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  if (!authContext?.token) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "electoral":
        return (
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-bold text-primary mb-3">انتخابات المجلس التنفيذي 2024</h2>
              <p className="text-text-primary mb-4">انتخابات لاختيار أعضاء المجلس التنفيذي للفترة القادمة 2024-2026</p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-medium">15 يونيو 2024</span>
                </div>
                <Link href="/voting/electoral/1">
                  <CustomButton>المشاركة في التصويت</CustomButton>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-3">انتخابات اللجنة الثقافية 2024</h2>
              <p className="text-text-primary mb-4">انتخابات لاختيار أعضاء اللجنة الثقافية للعام 2024</p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-medium">30 يونيو 2024</span>
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
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-bold text-primary mb-3">استطلاع رأي: مكان الاحتفال السنوي</h2>
              <p className="text-text-primary mb-4">استطلاع لتحديد المكان المناسب للاحتفال السنوي للمؤسسة</p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-medium">10 يونيو 2024</span>
                </div>
                <Link href="/voting/opinion/1">
                  <CustomButton>المشاركة في الاستطلاع</CustomButton>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-3">استطلاع رأي: الميزانية المقترحة</h2>
              <p className="text-text-primary mb-4">استطلاع للموافقة على الميزانية المقترحة للعام القادم</p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-text-secondary">
                  تنتهي في: <span className="font-medium">20 يونيو 2024</span>
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">التصويت</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "electoral"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
            onClick={() => setActiveTab("electoral")}
          >
            التصويت الانتخابي
          </button>
          <button
            className={`py-3 px-6 font-medium ${
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