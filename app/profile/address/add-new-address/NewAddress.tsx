"use client";
import React, { useState } from "react";
import { X, Plus, MapPin } from "lucide-react";
import AddressSelection from "./AddressSelection";

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddressFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("default");

  const [addressData, setAddressData] = useState({
    name: "",
    province: "",
    district: "",
    subdistrict: "",
    post_id: "",
    detail: "",
    default: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit({
    //   ...formData,
    //   post_id: parseInt(formData.post_id || "0"),
    // });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2 text-blue-600" />
            Add New Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>
        </div>

        {step == "default" ? (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1">
                Address Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={addressData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Home, Office"
              />
            </div>

            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Province, District, subdistrict
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={addressData.province}
                  onChange={handleChange}
                  onClick={() => setStep("province")}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Province, District, subdistrict"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="detail"
                className="block text-sm font-medium text-gray-700 mb-1">
                Address Details
              </label>
              <textarea
                id="detail"
                name="detail"
                value={addressData.detail}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full address details"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="default"
                name="default"
                checked={addressData.default}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="default"
                className="ml-2 block text-sm text-gray-900">
                Set as default address
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center transition-colors">
                <Plus className="mr-2" size={20} />
                Add Address
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 space-y-4">
            <AddressSelection
              onAddressSelect={(address) => {
                setAddressData((prev) => ({
                  ...prev,
                  ...address,
                }));
                setStep("default");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAddressModal;
