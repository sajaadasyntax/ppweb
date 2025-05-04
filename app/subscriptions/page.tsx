"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import { IoCalendarOutline, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const mockSubscriptions = [
  {
    id: 1,
    title: "اشتراك سنوي - الخدمات الكاملة",
    price: "500",
    currency: "جنيه",
    period: "سنة كاملة",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    features: [
      "الوصول إلى النشرة الدورية",
      "التصويت في جميع الاستطلاعات",
      "حضور الفعاليات الحصرية",
      "المشاركة في صنع القرار",
      "الوصول إلى أرشيف المستندات"
    ],
    isRecommended: true,
  },
  {
    id: 2,
    title: "اشتراك شهري - الخدمات الأساسية",
    price: "50",
    currency: "جنيه",
    period: "شهر واحد",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    features: [
      "الوصول إلى النشرة الدورية",
      "التصويت في الاستطلاعات العامة",
      "الوصول إلى أرشيف المستندات العامة"
    ],
    isRecommended: false,
  },
  {
    id: 3,
    title: "اشتراك فصلي - الخدمات المتوسطة",
    price: "150",
    currency: "جنيه",
    period: "ثلاثة أشهر",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    features: [
      "الوصول إلى النشرة الدورية",
      "التصويت في معظم الاستطلاعات",
      "حضور بعض الفعاليات الحصرية",
      "الوصول إلى معظم المستندات في الأرشيف"
    ],
    isRecommended: false,
  },
];

export default function Subscriptions() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);

  useEffect(() => {
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  if (!authContext?.token) {
    return null;
  }

  const handleSubscribe = (id: number) => {
    setSelectedSubscription(id);
    // In a real app, would make an API call to process the subscription
    setTimeout(() => {
      router.push("/previous-subscriptions");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">الاشتراكات</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubscriptions.map((subscription) => (
            <div 
              key={subscription.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                subscription.isRecommended ? "border-primary" : "border-gray-200"
              }`}
            >
              {subscription.isRecommended && (
                <div className="bg-primary text-white text-center py-2">
                  <span className="text-sm font-medium">الاشتراك الموصى به</span>
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-primary mb-2">{subscription.title}</h2>
                
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-text-primary">{subscription.price}</span>
                  <span className="text-text-secondary mr-1">{subscription.currency}</span>
                  <span className="text-text-secondary mr-2">/ {subscription.period}</span>
                </div>
                
                <div className="flex items-center text-text-secondary text-sm mb-4">
                  <IoCalendarOutline className="ml-1" />
                  <span>{`${subscription.startDate} إلى ${subscription.endDate}`}</span>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <h3 className="font-medium text-text-primary mb-3">المميزات:</h3>
                  <ul className="space-y-2">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-text-primary">
                        <IoCheckmarkCircle className="text-primary ml-2 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <CustomButton 
                    className="w-full" 
                    onClick={() => handleSubscribe(subscription.id)}
                    disabled={selectedSubscription === subscription.id}
                  >
                    {selectedSubscription === subscription.id ? "جاري المعالجة..." : "اشترك الآن"}
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 