"use client";
import React, { useState } from "react";
import { MapPin, Home, Building, Clock, Star, Edit, Trash } from "lucide-react";

interface AddressData {
  default: boolean;
  _id: string;
  name: string;
  user_id: string;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
  createdAt: string;
  updatedAt: string;
}

const AddressCard = ({ address }: { address: AddressData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              {address.name === "Home" ? (
                <Home className="w-5 h-5 text-blue-600" />
              ) : (
                <Building className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{address.name}</h3>
              {address.default && (
                <div className="flex items-center text-xs text-yellow-600">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                  Default Address
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
              <Trash className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-gray-600">
              {[
                address.detail,
                address.subdistrict,
                address.district,
                address.province,
                address.post_id,
              ]
                .filter(Boolean)
                .join(", ") || "No address details provided"}
            </p>
          </div>
        </div>

        {/* Footer with timestamp */}
        <div className="flex items-center text-xs text-gray-400 pt-2 border-t border-gray-50">
          <Clock className="w-3 h-3 mr-1" />
          <span>
            Added {new Date(address.createdAt).toLocaleDateString("th-TH")}
          </span>
        </div>
      </div>
    </div>
  );
};

// Example usage with a grid layout
export default function AddressCardList({
  addressData,
}: {
  addressData: AddressData[];
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-4 w-full">
      {addressData && addressData.length > 0 && (
        <div className="flex w-full justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            เพิ่มที่อยู่ใหม่
          </button>
        </div>
      )}

      {addressData && addressData.length > 0 ? (
        <div className="grid gap-6">
          {addressData.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center m-auto">
          <div className="text-center text-gray-500">
            <p className="text-lg font-semibold">ไม่มีที่อยู่ที่บันทึกไว้</p>
            <p className="text-sm mt-2">
              เพิ่มที่อยู่ใหม่ของคุณได้โดยคลิกปุ่มด้านล่าง
            </p>
            <div className="py-4">
              <a
                href="/profile/address/add-new-address"
                className="px-4 py-2 max-w-32 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                เพิ่มที่อยู่ใหม่
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
