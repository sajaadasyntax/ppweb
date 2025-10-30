"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { apiClient } from "@/context/apiContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoCalendarOutline } from "react-icons/io5";
import Image from "next/image";

interface BulletinItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
}

export default function Bulletin() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [bulletins, setBulletins] = useState<BulletinItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only redirect after hydration is complete
    if (authContext?.isHydrated && !token) {
      router.push("/auth/login");
      return;
    }

    // Only fetch data after hydration and if we have a token
    if (authContext?.isHydrated && token) {
      const fetchBulletins = async () => {
        setLoading(true);
        try {
          const data = await apiClient.content.getBulletins(token);
          setBulletins(data.bulletins);
        } catch (err) {
          console.error("Error fetching bulletins:", err);
          setError("حدث خطأ في جلب النشرة");
          
          // Fallback to mock data for development
          setBulletins(mockBulletins);
        } finally {
          setLoading(false);
        }
      };

      fetchBulletins();
    }
  }, [token, authContext?.isHydrated, router]);

  // Show loading state while hydrating
  if (!authContext?.isHydrated) {
    return <LoadingSpinner />;
  }

  if (!token) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-right">النشرة الإخبارية</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-right">
          {error}
        </div>
      )}
      
      {bulletins.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">لا توجد أخبار متاحة حالياً</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bulletins.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              {item.image && (
                <div className="relative w-full h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x400?text=صورة+غير+متوفرة";
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold text-right">{item.title}</h2>
                  <div className="flex items-center text-gray-500 gap-1">
                    <IoCalendarOutline />
                    <span className="text-sm">{item.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-right">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Fallback mock data if API fails
const mockBulletins: BulletinItem[] = [
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