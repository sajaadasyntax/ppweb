"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoCalendarOutline, IoDocument, IoDownload, IoSearch } from "react-icons/io5";
import CustomButton from "@/components/CustomButton";
import AppTextInput from "@/components/AppTextInput";
import { apiClient } from "@/context/apiContext";

interface Document {
  id: number;
  title: string;
  type: string;
  category: string;
  date: string;
  size: string;
  url: string;
}

const ArchivePage = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  useEffect(() => {
    // Only redirect after hydration is complete
    if (authContext?.isHydrated && !token) {
      router.push("/auth/login");
      return;
    }

    // Only fetch data after hydration and if we have a token
    if (authContext?.isHydrated && token) {
      const fetchArchiveData = async () => {
        setLoading(true);
        try {
          const data = await apiClient.content.getArchive(token);
          setDocuments(data.documents);
          
          // Extract unique categories and add "All" option
          const uniqueCategories = ["الكل", ...new Set(data.documents.map((doc: Document) => doc.category))] as string[];
          setCategories(uniqueCategories);
        } catch (err) {
          console.error("Error fetching archive data:", err);
          setError("حدث خطأ في جلب البيانات");
          
          // Fallback to mock data for development
          setDocuments(mockDocuments);
          setCategories(["الكل", ...new Set(mockDocuments.map(doc => doc.category))]);
        } finally {
          setLoading(false);
        }
      };

      fetchArchiveData();
    }
  }, [token, authContext?.isHydrated, router]);

  // Show loading state while hydrating
  if (!authContext?.isHydrated) {
    return <LoadingSpinner />;
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchText === "" || 
      doc.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || 
      doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDownload = (document: Document) => {
    // Implement actual download logic
    window.open(document.url, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-right">أرشيف الوثائق</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="md:w-1/3">
          <AppTextInput
            placeholder="ابحث عن وثيقة..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            icon={<IoSearch />}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-right">
          {error}
        </div>
      )}
      
      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <p className="text-center py-8 text-gray-500">لا توجد وثائق متاحة</p>
        ) : (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-right">{doc.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <IoDocument />
                    {doc.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoCalendarOutline />
                    {doc.date}
                  </span>
                  <span>{doc.size}</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                    {doc.category}
                  </span>
                </div>
              </div>
              <CustomButton
                title="تحميل"
                icon={<IoDownload />}
                onClick={() => handleDownload(doc)}
                primary
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Fallback mock data if API fails
const mockDocuments: Document[] = [
  {
    id: 1,
    title: "النظام الأساسي للمؤسسة",
    type: "PDF",
    category: "وثائق قانونية",
    date: "2023-01-15",
    size: "1.2 MB",
    url: "/documents/statute.pdf",
  },
  {
    id: 2,
    title: "التقرير السنوي 2023",
    type: "PDF",
    category: "تقارير",
    date: "2024-01-30",
    size: "3.5 MB",
    url: "/documents/annual-report-2023.pdf",
  },
  {
    id: 3,
    title: "محضر اجتماع الجمعية العمومية",
    type: "DOCX",
    category: "محاضر اجتماعات",
    date: "2023-12-10",
    size: "0.8 MB",
    url: "/documents/meeting-minutes.docx",
  },
  {
    id: 4,
    title: "الخطة الاستراتيجية 2024-2026",
    type: "PDF",
    category: "خطط استراتيجية",
    date: "2024-02-20",
    size: "2.1 MB",
    url: "/documents/strategic-plan.pdf",
  },
  {
    id: 5,
    title: "الميزانية التقديرية 2024",
    type: "XLSX",
    category: "ميزانيات",
    date: "2024-03-05",
    size: "1.5 MB",
    url: "/documents/budget-2024.xlsx",
  },
];

export default ArchivePage; 