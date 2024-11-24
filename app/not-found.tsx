import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 bg-gradient-to-b from-[#FEF6F1] to-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#257180] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-[#257180] mb-6">
          อุ๊ปส์! หน้านี้หายไปไหนแล้วนะ? 🤔
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          เหมือนว่าหน้าที่คุณกำลังมองหาจะหลบไปเที่ยวที่ไหนซะแล้ว
        </p>
        <p className="text-gray-500 mb-8">
          ไม่ต้องกังวลไป! ลองกลับไปที่หน้าหลักเพื่อค้นหาเนื้อหาที่น่าสนใจอื่นๆ ได้เลย
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-[#257180] text-white rounded-lg hover:bg-[#1d5761] transition-colors inline-flex items-center">
            <span className="mr-2">🏠</span>
            กลับสู่หน้าแรก
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-[#257180] text-[#257180] rounded-lg hover:bg-[#FEF6F1] transition-colors inline-flex items-center">
            <span className="mr-2">📞</span>
            ติดต่อเรา
          </Link>
        </div>
      </div>
      <div className="mt-12 text-sm text-gray-500">
        <p>กำลังมองหาอะไรอยู่? ลองติดต่อทีมงานของเราเพื่อขอความช่วยเหลือได้</p>
      </div>
    </div>
  );
}
