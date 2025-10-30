"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

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
    // Only redirect after hydration is complete
    if (authContext?.isHydrated && !authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, authContext?.isHydrated, router]);

  // Show loading state while hydrating
  if (!authContext?.isHydrated) {
    return <LoadingSpinner />;
  }

  // If not authenticated, don't show the content
  if (!authContext?.token) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section - matching pp.app design */}
      <div className="h-1/3 bg-primary rounded-b-2xl flex flex-col items-center justify-center px-spacing-2 shadow-card">
        <h1 className="text-xxlarge font-bold text-text-white text-center mt-spacing-4 font">
          مرحباً بك
        </h1>
        <button
          className="bg-red-500 rounded-2xl py-3 px-4 text-white font mt-spacing-2 shadow-button hover:bg-red-600 transition-colors"
          onClick={() => authContext?.logout && authContext.logout()}
        >
          تسجيل الخروج
        </button>
        <p className="text-medium text-text-white text-center mt-spacing opacity-90 font">
          اختر الخدمة التي تريدها
        </p>
      </div>

      {/* Menu Items Section */}
      <div className="px-spacing-2 pt-spacing-4 flex-1">
        <div className="grid grid-cols-2 gap-spacing-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className="bg-primary-light p-spacing-2 rounded-xl shadow-card border border-primary flex items-center justify-center min-h-[80px] hover:bg-primary hover:text-text-white transition-colors group"
            >
              <span className="text-medium text-primary font-medium text-center group-hover:text-text-white font">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
