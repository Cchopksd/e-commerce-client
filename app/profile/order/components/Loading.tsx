import React from 'react'

export default function Loading() {
  return (
    <div className="w-full animate-pulse">

      {/* Orders List Skeleton */}
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Order Image Skeleton */}
              <div className="w-full md:w-32 h-32 bg-gray-200 rounded-md"></div>
              
              {/* Order Details Skeleton */}
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>

              {/* Order Status Skeleton */}
              <div className="w-full md:w-32">
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
