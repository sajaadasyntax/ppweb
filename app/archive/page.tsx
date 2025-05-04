"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { IoCalendarOutline, IoDocument, IoDownload, IoSearch } from "react-icons/io5";
import CustomButton from "@/components/CustomButton";
import AppTextInput from "@/components/AppTextInput";

interface Document {
  id: number;
  title: string;
  type: string;
  category: string;
  date: string;
  size: string;
  url: string;
}

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

const categories = [
  "الكل",
  "وثائق قانونية",
  "تقارير",
  "محاضر اجتماعات",
  "خطط استراتيجية",
  "ميزانيات",
];

export default function Archive() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);

  useEffect(() => {
    if (!authContext?.token) {
      router.push("/auth/login");
    }
  }, [authContext?.token, router]);

  useEffect(() => {
    let result = mockDocuments;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "الكل") {
      result = result.filter(doc => doc.category === selectedCategory);
    }
    
    setFilteredDocuments(result);
  }, [searchTerm, selectedCategory]);

  if (!authContext?.token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white text-center">الأرشيف</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="البحث في الوثائق..."
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredDocuments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-text-secondary font-medium">اسم الوثيقة</th>
                    <th className="px-6 py-3 text-right text-text-secondary font-medium">النوع</th>
                    <th className="px-6 py-3 text-right text-text-secondary font-medium">التصنيف</th>
                    <th className="px-6 py-3 text-right text-text-secondary font-medium">التاريخ</th>
                    <th className="px-6 py-3 text-right text-text-secondary font-medium">الحجم</th>
                    <th className="px-6 py-3 text-right text-text-secondary font-medium">تحميل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <IoDocument className="ml-2 text-primary" />
                          <span className="text-text-primary font-medium">{doc.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{doc.type}</td>
                      <td className="px-6 py-4 text-text-secondary">{doc.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-text-secondary">
                          <IoCalendarOutline className="ml-1" />
                          <span>{doc.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{doc.size}</td>
                      <td className="px-6 py-4">
                        <a 
                          href={doc.url} 
                          download
                          className="p-2 text-primary hover:bg-primary/10 rounded-full inline-flex"
                        >
                          <IoDownload size={20} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-text-secondary">لا توجد وثائق مطابقة لمعايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 