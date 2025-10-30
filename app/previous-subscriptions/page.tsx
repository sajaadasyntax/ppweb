"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoCalendarOutline, IoCheckmarkCircle } from "react-icons/io5";

const mockPreviousSubscriptions = [
  {
    id: 101,
    title: "اشتراك سنوي - الخدمات الكاملة",
    price: "450",
    currency: "جنيه",
    period: "سنة كاملة",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "منتهي",
    features: [
      "الوصول إلى النشرة الدورية",
      "التصويت في جميع الاستطلاعات",
      "حضور الفعاليات الحصرية",
      "المشاركة في صنع القرار",
      "الوصول إلى أرشيف المستندات"
    ],
  },
  {
    id: 102,
    title: "اشتراك فصلي - الخدمات المتوسطة",
    price: "120",
    currency: "جنيه",
    period: "ثلاثة أشهر",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    status: "منتهي",
    features: [
      "الوصول إلى النشرة الدورية",
      "التصويت في معظم الاستطلاعات",
      "حضور بعض الفعاليات الحصرية",
      "الوصول إلى معظم المستندات في الأرشيف"
    ],
  },
];

export default function PreviousSubscriptions() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">الاشتراكات السابقة</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {mockPreviousSubscriptions.length > 0 ? (
          <div className="space-y-6">
            {mockPreviousSubscriptions.map((subscription) => (
              <div 
                key={subscription.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-primary">{subscription.title}</h2>
                    <span className="px-3 py-1 bg-gray-100 text-text-secondary rounded-full text-sm">
                      {subscription.status}
                    </span>
                  </div>
                  
                  <div className="flex items-end mb-4">
                    <span className="text-2xl font-bold text-text-primary">{subscription.price}</span>
                    <span className="text-text-secondary mr-1">{subscription.currency}</span>
                    <span className="text-text-secondary mr-2">/ {subscription.period}</span>
                  </div>
                  
                  <div className="flex items-center text-text-secondary text-sm mb-4">
                    <IoCalendarOutline className="ml-1" />
                    <span>{`${subscription.startDate} إلى ${subscription.endDate}`}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 my-4 pt-4">
                    <h3 className="font-medium text-text-primary mb-3">المميزات التي تم الحصول عليها:</h3>
                    <ul className="space-y-2">
                      {subscription.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-text-primary">
                          <IoCheckmarkCircle className="text-primary ml-2 flex-shrink-0" size={18} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-text-primary mb-2">لا توجد اشتراكات سابقة</h2>
            <p className="text-text-secondary mb-4">لم تقم بأي اشتراكات في السابق</p>
          </div>
        )}
      </div>
    </div>
  );
} 