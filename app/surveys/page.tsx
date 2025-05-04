"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
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
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  if (!authContext?.token) {
    return null;
  }

  const renderSurveyCard = (survey: any, type: string) => (
    <div key={survey.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold text-primary mb-2">{survey.title}</h2>
      <p className="text-text-primary mb-4">{survey.description}</p>
      
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
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
      
      <div className="mt-4">
        <Link href={`/surveys/${type}/${survey.id}`}>
          <CustomButton>المشاركة في الاستبيان</CustomButton>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">الاستبيانات</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "public"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
            onClick={() => setActiveTab("public")}
          >
            الاستبيانات العامة
          </button>
          <button
            className={`py-3 px-6 font-medium ${
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
        <div className="mt-6">
          {activeTab === "public" ? (
            publicSurveys.length > 0 ? (
              publicSurveys.map(survey => renderSurveyCard(survey, "public"))
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-text-secondary">لا توجد استبيانات عامة متاحة حالياً</p>
              </div>
            )
          ) : (
            memberSurveys.length > 0 ? (
              memberSurveys.map(survey => renderSurveyCard(survey, "members"))
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-text-secondary">لا توجد استبيانات للأعضاء متاحة حالياً</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
} 