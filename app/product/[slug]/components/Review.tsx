"use client";
import React from "react";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  role: string;
  profile_image: string;
  __v: number;
}

export interface Review {
  _id: string;
  product: string;
  user: User;
  score: number;
  comment: string;
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReviewsResponse {
  reviews: Review[];
}

const StarRating = ({ score }: { score: number }) => {
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;
  console.log(hasHalfStar);
  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-gray-500 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 text-gray-500 fill-yellow-400" />
      )}
      {[...Array(5 - Math.ceil(score))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-500" />
      ))}
    </div>
  );
};

export default function Review({ reviews }: ReviewsResponse) {
  const score = reviews.length > 0 
    ? reviews.reduce((acc, item) => acc + item.score, 0) 
    : 0;
  const scoreTotal = reviews.length > 0 
    ? (score / reviews.length).toFixed(1) 
    : "0.0";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full mx-auto space-y-6 p-4">
      {/* Summary Card */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center space-x-4">
          <StarRating score={Number(scoreTotal)} />
          <span className="text-2xl font-bold">{scoreTotal} / 5</span>
          <span className="text-gray-500">
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {review.user.profile_image ? (
                        <div className="w-full h-full">
                          <Image
                            src={review.user.profile_image}
                            alt="profile"
                            width={0}
                            height={0}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <span className="text-lg font-medium text-gray-600">
                          {review.user.first_name[0]}
                          {review.user.last_name[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.user.first_name} {review.user.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <StarRating score={review.score} />
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <div className="space-y-3">
              <div className="text-gray-400">
                <svg 
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                ยังไม่มีรีวิวสำหรับสินค้านี้
              </h3>
              <p className="text-gray-500">
                เป็นคนแรกที่รีวิวสินค้านี้และแบ่งปันความคิดเห็นของคุณ
              </p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 
                rounded-md shadow-sm text-sm font-medium text-gray-700 
                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-blue-500">
                ซื้้อสินค้า
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
