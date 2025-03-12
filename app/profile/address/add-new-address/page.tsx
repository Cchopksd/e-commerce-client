"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, MapPin, Loader2, Check } from "lucide-react";
import AddressSelection from "./AddressSelection";
import { createNewAddress } from "./action";
import { toast } from "react-hot-toast"; // Assuming a toast library for notifications

type AddressData = {
  name: string;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
  default: boolean;
};

const AddAddressModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<"default" | "province">("default");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [addressData, setAddressData] = useState<AddressData>({
    name: "",
    province: "",
    district: "",
    subdistrict: "",
    post_id: 0,
    detail: "",
    default: false,
  });

  // Validate input on change
  useEffect(() => {
    const errors: Record<string, string> = {};

    if (addressData.name && addressData.name.length > 50) {
      errors.name = "Address name must be less than 50 characters";
    }

    setValidationErrors(errors);
  }, [addressData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddressSelect = (address: Partial<AddressData>) => {
    setAddressData((prev) => ({
      ...prev,
      ...address,
    }));
    setStep("default");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if location is selected
    if (
      !addressData.province ||
      !addressData.district ||
      !addressData.subdistrict
    ) {
      toast.error("Please select your location");
      return;
    }

    // Check for validation errors
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createNewAddress({ address: addressData });

      if (response) {
        toast.success("Address added successfully!");
        // Use router for navigation instead of direct window location change
        setTimeout(() => {
          window.location.href = "/profile/address";
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationDisplay =
    addressData.province || addressData.district || addressData.subdistrict
      ? `${addressData.province} ${addressData.district} ${addressData.subdistrict}`.trim()
      : "";

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <section className='max-w-4xl w-full mx-auto bg-white shadow-lg rounded-xl max-h-[90vh] overflow-auto'>
        <div className='sticky top-0 z-10 bg-white flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-semibold flex items-center'>
            <MapPin className='mr-2 text-blue-600' />
            {step === "default" ? "Add New Address" : "Select Location"}
          </h2>
          <button
            onClick={onClose}
            aria-label='Close'
            className='text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100'>
            <X size={24} />
          </button>
        </div>

        {step === "default" ? (
          <form
            onSubmit={handleSubmit}
            className='p-4 space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Address Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={addressData.name}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${
                  validationErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder='e.g., Home, Office'
              />
              {validationErrors.name && (
                <p className='mt-1 text-sm text-red-500'>
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Province, District, Subdistrict{" "}
                <span className='text-red-500'>*</span>
              </label>
              <div
                onClick={() => setStep("province")}
                className={`w-full px-3 py-2 border ${
                  !locationDisplay ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-between`}>
                <span
                  className={
                    locationDisplay ? "text-gray-900" : "text-gray-400"
                  }>
                  {locationDisplay || "Select location"}
                </span>
                <MapPin
                  size={20}
                  className='text-gray-400'
                />
              </div>
              {!locationDisplay && (
                <p className='mt-1 text-sm text-red-500'>
                  Please select a location
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='detail'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Address Details <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='detail'
                name='detail'
                value={addressData.detail}
                onChange={handleChange}
                required
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='House/building number, street name, landmarks'
              />
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                id='default'
                name='default'
                checked={addressData.default}
                onChange={handleChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label
                htmlFor='default'
                className='ml-2 block text-sm text-gray-900'>
                Set as default address
              </label>
            </div>

            <div className='flex justify-end space-x-3 pt-4 border-t'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors'
                disabled={isSubmitting}>
                Cancel
              </button>
              <button
                type='submit'
                disabled={
                  isSubmitting || Object.keys(validationErrors).length > 0
                }
                className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-md flex items-center transition-colors'>
                {isSubmitting ? (
                  <Loader2
                    className='mr-2 animate-spin'
                    size={20}
                  />
                ) : (
                  <Plus
                    className='mr-2'
                    size={20}
                  />
                )}
                {isSubmitting ? "Adding..." : "Add Address"}
              </button>
            </div>
          </form>
        ) : (
          <div className='p-4'>
            <AddressSelection
              setStep={setStep}
              addressData={addressData}
              onAddressSelect={handleAddressSelect}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default AddAddressModal;
