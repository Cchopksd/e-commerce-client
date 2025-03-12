"use client";
import React, { useState } from "react";
import { CheckCircle2, Star, X } from "lucide-react";
import Image from "next/image";
import { saveReview } from "./action";

interface Product {
  product_id: string;
  user_id: string;
  name: string;
  image: string;
}

interface ReviewData {
  product_id: string;
  user_id: string;
  score: number;
  comment: string;
  reviewed: boolean;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData: ReviewData = {
      product_id: product.product_id,
      user_id: product.user_id.toString(),
      score: rating,
      comment: comment,
      reviewed: true,
    };

    try {
      // Simulate API call delay
      const saveReviewed = await saveReview({ reviewData });

      if (!saveReviewed) {
        throw new Error("Failed to save review");
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setRating(5);
        setComment("");
      }, 1500);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={onClose}></div>

        <div className='relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
          {/* Modal Header */}
          <div className='bg-blue-50 px-4 py-3 flex justify-between items-center'>
            <h3 className='text-lg font-semibold text-gray-900 flex items-center'>
              <Star className='w-5 h-5 text-yellow-500 mr-2' />
              รีวิวสินค้า
            </h3>
            <button
              type='button'
              className='text-gray-500 hover:text-gray-700 focus:outline-none'
              onClick={onClose}>
              <X className='w-5 h-5' />
            </button>
          </div>

          {/* Modal Content */}
          <div className='px-4 py-5 sm:p-6'>
            {isSuccess ? (
              <div className='text-center py-10'>
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                  <CheckCircle2
                    className='h-6 w-6 text-green-600'
                    aria-hidden='true'
                  />
                </div>
                <h3 className='mt-3 text-lg font-medium text-gray-900'>
                  ขอบคุณสำหรับรีวิว!
                </h3>
                <p className='mt-2 text-sm text-gray-500'>
                  รีวิวของคุณได้ถูกบันทึกเรียบร้อยแล้ว
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Product Info */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative'>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900'>
                      {product.name}
                    </h4>
                  </div>
                </div>

                {/* Star Rating */}
                <div className='mb-6'>
                  <label className='block text-left text-sm font-medium text-gray-700 mb-2'>
                    คะแนน
                  </label>
                  <div className='flex items-center gap-2 justify-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setRating(star)}
                        className='focus:outline-none'>
                        <Star
                          className={`w-8 h-8 ${
                            rating >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className='mb-6'>
                  <label
                    htmlFor='comment'
                    className='block text-left text-sm font-medium text-gray-700 mb-2'>
                    ความคิดเห็น
                  </label>
                  <textarea
                    id='comment'
                    rows={4}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='แชร์ประสบการณ์ของคุณกับสินค้านี้...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </div>

                {/* Submit Button */}
                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                    onClick={onClose}>
                    ยกเลิก
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSubmitting}>
                    {isSubmitting ? "กำลังส่ง..." : "ส่งรีวิว"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
