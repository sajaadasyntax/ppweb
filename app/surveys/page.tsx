"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoCalendarOutline, IoPeople, IoPersonCircle } from "react-icons/io5";

const publicSurveys = [
  {
    id: 1,
    title: "استبيان رضا المواطنين عن الخدمات العامة",
    description: "استبيان لقياس مستوى رضا المواطنين عن الخدمات العامة المقدمة في المنطقة",
    endDate: "2024-06-30",
    participants: 153,
    questions: 12,
  },
  {
    id: 2,
    title: "استبيان الاحتياجات المجتمعية",
    description: "استبيان لتحديد الاحتياجات المجتمعية الأكثر إلحاحاً للسنة المقبلة",
    endDate: "2024-07-15",
    participants: 87,
    questions: 8,
  },
];

const memberSurveys = [
  {
    id: 101,
    title: "استبيان تطوير الخدمات الإلكترونية",
    description: "استبيان خاص بالأعضاء لتقييم واقتراح تحسينات على الخدمات الإلكترونية المقدمة",
    endDate: "2024-06-20",
    participants: 42,
    questions: 15,
  },
  {
    id: 102,
    title: "استبيان تقييم البرامج التدريبية",
    description: "استبيان لتقييم البرامج التدريبية التي تم تقديمها للأعضاء خلال الستة أشهر الماضية",
    endDate: "2024-06-25",
    participants: 36,
    questions: 10,
  },
];

export default function Surveys() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("public");

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

  const renderSurveyCard = (survey: {
    id: number;
    title: string;
    description: string;
    endDate: string;
    participants: number;
    questions: number;
  }, type: string) => (
    <div key={survey.id} className="bg-background rounded-xl shadow-card p-spacing-2 mb-spacing border border-gray-light">
      <h2 className="text-large font-bold text-primary mb-2">{survey.title}</h2>
      <p className="text-text-primary mb-spacing">{survey.description}</p>
      
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-spacing">
        <div className="flex items-center text-text-secondary">
          <IoCalendarOutline className="ml-1" />
          <span>تنتهي في: {survey.endDate}</span>
        </div>
        <div className="flex items-center text-text-secondary">
          <IoPeople className="ml-1" />
          <span>{survey.participants} مشارك</span>
        </div>
        <div className="flex items-center text-text-secondary">
          <IoPersonCircle className="ml-1" />
          <span>{survey.questions} سؤال</span>
        </div>
      </div>
      
      <div className="mt-spacing">
        <Link href={`/surveys/${type}/${survey.id}`}>
          <CustomButton>المشاركة في الاستبيان</CustomButton>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary p-spacing-2 rounded-b-3xl">
        <h1 className="text-large font-bold text-text-white text-center">الاستبيانات</h1>
      </div>
      
      <div className="px-spacing-2 py-spacing-2">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-light">
          <button
            className={`py-3 px-6 font-bold ${
              activeTab === "public"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
            onClick={() => setActiveTab("public")}
          >
            الاستبيانات العامة
          </button>
          <button
            className={`py-3 px-6 font-bold ${
              activeTab === "members"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
            onClick={() => setActiveTab("members")}
          >
            استبيانات الأعضاء
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="mt-spacing-2">
          {activeTab === "public" ? (
            publicSurveys.length > 0 ? (
              publicSurveys.map(survey => renderSurveyCard(survey, "public"))
            ) : (
              <div className="text-center py-10 bg-background rounded-xl shadow-card">
                <p className="text-text-secondary">لا توجد استبيانات عامة متاحة حالياً</p>
              </div>
            )
          ) : (
            memberSurveys.length > 0 ? (
              memberSurveys.map(survey => renderSurveyCard(survey, "members"))
            ) : (
              <div className="text-center py-10 bg-background rounded-xl shadow-card">
                <p className="text-text-secondary">لا توجد استبيانات للأعضاء متاحة حالياً</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
} 