"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import AppTextInput from "@/components/AppTextInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoCamera, IoLogOut, IoPersonCircle, IoSettings } from "react-icons/io5";

export default function Profile() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "0123456789",
    membershipNumber: "12345",
    membershipType: "عضو كامل",
    joinDate: "2022-05-10",
  });
  const [formData, setFormData] = useState({ ...userData });

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

  const handleLogout = async () => {
    await authContext.logout();
    router.push("/auth/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ ...formData });
    setEditing(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">المعلومات الشخصية</h2>
              {!editing ? (
                <CustomButton 
                  variant="outline" 
                  onClick={() => setEditing(true)}
                >
                  تعديل
                </CustomButton>
              ) : null}
            </div>
            
            {!editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-secondary text-sm">الاسم</p>
                    <p className="text-text-primary font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">البريد الإلكتروني</p>
                    <p className="text-text-primary font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">رقم الهاتف</p>
                    <p className="text-text-primary font-medium">{userData.phone}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">رقم العضوية</p>
                    <p className="text-text-primary font-medium">{userData.membershipNumber}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">نوع العضوية</p>
                    <p className="text-text-primary font-medium">{userData.membershipType}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">تاريخ الانضمام</p>
                    <p className="text-text-primary font-medium">{userData.joinDate}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AppTextInput
                    label="الاسم"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <AppTextInput
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <AppTextInput
                    label="رقم الهاتف"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="mb-4">
                    <label className="block text-text-primary mb-2 text-sm font-medium">
                      رقم العضوية
                    </label>
                    <input
                      className="w-full p-4 rounded-lg border border-gray-300 text-text-secondary bg-gray-50 focus:outline-none cursor-not-allowed"
                      value={formData.membershipNumber}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-text-primary mb-2 text-sm font-medium">
                      نوع العضوية
                    </label>
                    <input
                      className="w-full p-4 rounded-lg border border-gray-300 text-text-secondary bg-gray-50 focus:outline-none cursor-not-allowed"
                      value={formData.membershipType}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-text-primary mb-2 text-sm font-medium">
                      تاريخ الانضمام
                    </label>
                    <input
                      className="w-full p-4 rounded-lg border border-gray-300 text-text-secondary bg-gray-50 focus:outline-none cursor-not-allowed"
                      value={formData.joinDate}
                      disabled
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <CustomButton type="submit">حفظ التغييرات</CustomButton>
                  <CustomButton 
                    variant="outline" 
                    onClick={() => {
                      setFormData({ ...userData });
                      setEditing(false);
                    }}
                  >
                    إلغاء
                  </CustomButton>
                </div>
              </form>
            )}
          </div>
        );
      
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-6">الإعدادات</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">إعدادات الخصوصية</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="emailNotifications" className="ml-2" defaultChecked />
                    <label htmlFor="emailNotifications" className="text-text-primary">
                      تلقي إشعارات البريد الإلكتروني
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="profileVisibility" className="ml-2" defaultChecked />
                    <label htmlFor="profileVisibility" className="text-text-primary">
                      السماح للأعضاء الآخرين برؤية معلومات ملفي الشخصي
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">تغيير كلمة المرور</h3>
                <div className="space-y-3">
                  <AppTextInput 
                    type="password" 
                    label="كلمة المرور الحالية" 
                    placeholder="أدخل كلمة المرور الحالية"
                  />
                  <AppTextInput 
                    type="password" 
                    label="كلمة المرور الجديدة" 
                    placeholder="أدخل كلمة المرور الجديدة"
                  />
                  <AppTextInput 
                    type="password" 
                    label="تأكيد كلمة المرور الجديدة" 
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                  />
                  <div className="mt-4">
                    <CustomButton>تغيير كلمة المرور</CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-primary h-32 relative">
            <div className="absolute -bottom-16 right-8 bg-white rounded-full p-1 border-4 border-white">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <IoPersonCircle className="text-gray-400 w-full h-full" />
                <button className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-1 flex items-center justify-center">
                  <IoCamera className="ml-1" />
                  <span className="text-xs">تغيير</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-8">
            <h1 className="text-2xl font-bold text-primary">{userData.name}</h1>
            <p className="text-text-secondary">{userData.membershipType}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav className="space-y-1">
              <button
                className={`w-full py-3 px-4 rounded-lg text-right flex items-center ${
                  activeTab === "info"
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("info")}
              >
                <IoPersonCircle className="ml-2" size={20} />
                <span>المعلومات الشخصية</span>
              </button>
              <button
                className={`w-full py-3 px-4 rounded-lg text-right flex items-center ${
                  activeTab === "settings"
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <IoSettings className="ml-2" size={20} />
                <span>الإعدادات</span>
              </button>
              <button
                className="w-full py-3 px-4 rounded-lg text-right flex items-center text-text-primary hover:bg-gray-100"
                onClick={handleLogout}
              >
                <IoLogOut className="ml-2" size={20} />
                <span>تسجيل الخروج</span>
              </button>
            </nav>
          </div>
          
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
} 