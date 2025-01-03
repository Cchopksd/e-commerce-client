"use client";
import React, { useState } from "react";
import { X, Plus, MapPin } from "lucide-react";
import AddressSelection from "./AddressSelection";
import { createNewAddress } from "./action";

const AddAddressModal = () => {
  const [step, setStep] = useState<"default" | "province">("default");

  const [addressData, setAddressData] = useState({
    name: "",
    province: "",
    district: "",
    subdistrict: "",
    post_id: 0,
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

  const handleAddressSelect = (address: any) => {
    setAddressData((prev) => ({
      ...prev,
      ...address,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createNewAddress({ address: addressData });

    if (response) {
      window.location.href = "/profile/address";
    }
  };

  const locationDisplay =
    `${addressData.province} ${addressData.district} ${addressData.subdistrict}`.trim();

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="mr-2 text-blue-600" />
          Add New Address
        </h2>
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          <X size={24} />
        </button>
      </div>

      {step === "default" ? (
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
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1">
                Province, District, Subdistrict
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={locationDisplay}
                readOnly
                onClick={() => setStep("province")}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                placeholder="Select location"
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
            setStep={setStep}
            addressData={addressData}
            onAddressSelect={handleAddressSelect}
          />
        </div>
      )}
    </section>
  );
};

export default AddAddressModal;
