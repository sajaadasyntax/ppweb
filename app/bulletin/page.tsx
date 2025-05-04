"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { IoCalendarOutline } from "react-icons/io5";
import Image from "next/image";

const mockNews = [
  {
    id: 1,
    title: "تطورات الأزمة السياسية في السودان",
    date: "2024-04-01",
    content: "استمرار المحادثات بين الأطراف السياسية في السودان للتوصل إلى حل للأزمة السياسية الحالية. ممثلو القوى السياسية يجتمعون في جدة لمناقشة خارطة الطريق للانتقال الديمقراطي.",
    image: "/images/news1.png",
  },
  {
    id: 2,
    title: "اجتماعات القمة العربية في السودان",
    date: "2024-03-25",
    content: "استعدادات مكثفة في الخرطوم لاستضافة القمة العربية المقبلة. القادة العرب سيناقشون قضايا المنطقة وأهمها الأزمة السودانية والعلاقات العربية-الإفريقية.",
    image: "/images/news2.png",
  },
  {
    id: 3,
    title: "تطورات عملية السلام في دارفور",
    date: "2024-03-15",
    content: "تقدم ملحوظ في مفاوضات السلام في دارفور. الأطراف الموقعة على اتفاقية جوبا تبدأ تنفيذ المرحلة الثانية من الاتفاقية وسط تأكيدات دولية بدعم عملية السلام.",
    image: "/images/news3.png",
  },
  {
    id: 4,
    title: "الوضع الاقتصادي في السودان",
    date: "2024-03-10",
    content: "توقعات بتحسن الوضع الاقتصادي في السودان مع بدء تنفيذ الإصلاحات الاقتصادية. البنك الدولي يعلن عن حزمة دعم جديدة للاقتصاد السوداني بقيمة 500 مليون دولار.",
    image: "/images/news1.png",
  },
  {
    id: 5,
    title: "العلاقات السودانية-الإثيوبية",
    date: "2024-03-05",
    content: "لقاء قمة بين رئيسي السودان وإثيوبيا لبحث قضايا الحدود المشتركة والتعاون الاقتصادي. الجانبان يؤكدان على أهمية تعزيز العلاقات الثنائية في مختلف المجالات.",
    image: "/images/news2.png",
  },
];

export default function Bulletin() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  if (!authContext?.token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">النشرة</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {mockNews.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-48">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
                // Fallback to a placeholder if the image fails to load
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x400?text=صورة+غير+متوفرة";
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-primary">{news.title}</h2>
                <div className="flex items-center text-text-secondary gap-1">
                  <IoCalendarOutline />
                  <span className="text-sm">{news.date}</span>
                </div>
              </div>
              <p className="text-text-primary leading-relaxed">{news.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 