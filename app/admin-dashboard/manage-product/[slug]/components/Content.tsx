"use client";
import React, { useState, FormEvent } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { X, Plus } from "lucide-react";
import { updateProduct } from "./action";
import Image from "next/image";

interface ProductType {
  _id: string;
  name: string;
  images: Array<{
    image_url: string;
    public_id: string;
  }>;
  price: number;
  discount: number;
  category: string;
  detail: string;
  amount: number;
  sale_out: number;
}

const DraggableImage = ({
  image,
  index,
  moveImage,
  removeImage,
}: {
  image: { image_url: string; public_id: string };
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeImage: (index: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      className={`relative group transition-all duration-300 ${
        isDragging ? "scale-90 opacity-50" : "scale-100"
      } hover:shadow-lg`}>
      <Image
        fill
        src={image.image_url}
        alt={`Product image ${index + 1}`}
        className="w-full h-48 object-cover rounded-xl shadow-sm"
      />
      <button
        onClick={() => removeImage(index)}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
        <X size={14} />
      </button>
    </div>
  );
};

const ProductManagementPage = ({
  productData,
}: {
  productData: ProductType;
}) => {
  const [product, setProduct] = useState<ProductType>(productData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        image_url: URL.createObjectURL(file),
        public_id: "",
      }));

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const newImages = [...product.images];
    const [removedImage] = newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, removedImage);

    setProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const removeImage = (indexToRemove: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ["price", "discount", "amount", "sale_out"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price.toString());
      formData.append("discount", product.discount.toString());
      formData.append("category", product.category);
      formData.append("detail", product.detail);
      formData.append("amount", product.amount.toString());
      formData.append("sale_out", product.sale_out.toString());
      product.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image.image_url);
        if (image.public_id) {
          formData.append(`public_id[${index}]`, image.public_id);
        }
      });

      await updateProduct(product._id, formData);
    } catch (error) {
      alert("Error saving product.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            จัดการสินค้า
          </h1>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              รูปภาพสินค้า
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              {product.images.map((image, index) => (
                <DraggableImage
                  key={index}
                  image={image}
                  index={index}
                  moveImage={moveImage}
                  removeImage={removeImage}
                />
              ))}

              {product.images.length < 8 && (
                <label className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-48 hover:bg-gray-50 hover:border-blue-400 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Plus size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">อัพโหลดรูปภาพ</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price Input */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Category and Discount */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label
                  htmlFor="discount"
                  className="block text-gray-700 font-bold mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={product.discount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter discount"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <label
                htmlFor="detail"
                className="block text-gray-700 font-bold mb-2">
                Product Details
              </label>
              <textarea
                id="detail"
                name="detail"
                value={product.detail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter product details"
              />
            </div>

            {/* Amount and Sale Out */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-gray-700 font-bold mb-2">
                  Amount in Stock
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={product.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stock amount"
                />
              </div>
              <div>
                <label
                  htmlFor="sale_out"
                  className="block text-gray-700 font-bold mb-2">
                  Total Sales
                </label>
                <input
                  type="number"
                  id="sale_out"
                  name="sale_out"
                  value={product.sale_out}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total sales"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center
                  ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    <p className="text-white font-semibold">กำลังบันทึก...</p>
                  </>
                ) : (
                  <p className="text-white font-semibold">บันทึกข้อมูลสินค้า</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ProductManagementPage;