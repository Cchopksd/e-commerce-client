import React from "react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "ความงามและของใช้ส่วนตัว",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
  },
  {
    id: 2,
    name: "กลุ่มผลิตภัณฑ์เพื่อสุขภาพ",
    image:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?w=500&q=80",
  },
  {
    id: 3,
    name: "เสื้อผ้าแฟชั่นผู้ชาย",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80",
  },
  {
    id: 4,
    name: "เสื้อผ้าแฟชั่นผู้หญิง",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80",
  },
  {
    id: 5,
    name: "กระเป๋า",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
  },
  {
    id: 6,
    name: "รองเท้าผู้ชาย",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&q=80",
  },
  {
    id: 7,
    name: "รองเท้าผู้หญิง",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  },
  {
    id: 8,
    name: "เครื่องประดับ",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: 9,
    name: "นาฬิกาและแว่นตา",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: 10,
    name: "เครื่องใช้ในบ้าน",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80",
  },
  {
    id: 11,
    name: "อุปกรณ์อิเล็กทรอนิกส์",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
  },
  {
    id: 12,
    name: "มือถือ และ แท็บเล็ต",
    image:
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
  },
  {
    id: 13,
    name: "เครื่องใช้ไฟฟ้าภายในบ้าน",
    image:
      "https://images.unsplash.com/photo-1583241475880-083f84372725?w=500&q=80",
  },
  {
    id: 14,
    name: "คอมพิวเตอร์และแล็ปท็อป",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  },
  {
    id: 15,
    name: "กล้องและอุปกรณ์ถ่ายภาพ",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
  },
  {
    id: 16,
    name: "อาหารและเครื่องดื่ม",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80",
  },
  {
    id: 17,
    name: "ของเล่น สินค้าแม่และเด็ก",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80",
  },
  {
    id: 18,
    name: "กีฬาและกิจกรรมกลางแจ้ง",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80",
  },
  {
    id: 19,
    name: "สัตว์เลี้ยง",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
  },
  {
    id: 20,
    name: "เกมและอุปกรณ์เสริม",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80",
  },
];

interface CategoryCardProps {
  name: string;
  image: string;
}

const CategoryCard = ({ category }: { category: CategoryCardProps }) => {
  return (
    <div className='flex flex-col items-center cursor-pointer group gap-4'>
      <div className='w-full h-full max-w-28 max-h-28'>
        <Image
          src={category.image}
          alt={category.name}
          width={200}
          height={200}
          className='object-cover transition-transform duration-300 group-hover:scale-105 w-28 h-28 rounded-xl  mb-3 relative shadow-lg hover:shadow-xl '
        />
      </div>
      <span className='flex text-center justify-start text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 '>
        {category.name}
      </span>
    </div>
  );
};

const CategorySection = () => {
  return (
    <div className='w-full mx-auto px-4 py-4'>
      <h2 className='text-2xl font-bold mb-8 text-gray-800'>หมวดหมู่ยอดนิยม</h2>
      <div className='max-w-[1440px] overflow-x-auto py-4'>
        <div className='w-[1440px] grid grid-cols-10 gap-6'>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
