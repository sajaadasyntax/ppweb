"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

const menuItems = [
  { title: "النشرة", route: "/bulletin" },
  { title: "الاشتراكات", route: "/subscriptions" },
  { title: "الاشتراكات السابقة", route: "/previous-subscriptions" },
  { title: "التصويت", route: "/voting" },
  { title: "الاستبيانات", route: "/surveys" },
  { title: "الأرشيف", route: "/archive" },
  { title: "تقديم التقارير", route: "/submit-report" },
  { title: "الملف الشخصي", route: "/profile" },
];

export default function Home() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  // If not authenticated, don't show the content
  if (!authContext?.token) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-primary py-16 rounded-b-3xl flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-white text-center">مرحباً بك</h1>
        <p className="text-lg text-white text-center mt-2 opacity-90">
          اختر الخدمة التي تريدها
        </p>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 flex items-center justify-center"
            >
              <span className="text-lg text-primary font-medium text-center">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
