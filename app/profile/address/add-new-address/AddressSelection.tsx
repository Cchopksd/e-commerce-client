"use client";
import React, { useState, useEffect } from "react";

interface AddressSelectionProps {
  onAddressSelect: (address: {
    province: string;
    district: string;
    subdistrict: string;
  }) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({
  onAddressSelect,
}) => {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [subdistricts, setSubdistricts] = useState<string[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  useEffect(() => {
    async function fetchProvince() {
      const response = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json",
      );

      const province = await response.json();
      setProvinces(province);
    }

    fetchProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // Replace this with an API call to fetch districts based on selectedProvince.
      setDistricts(["District A1", "District A2", "District A3"]);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setSelectedSubdistrict("");
    setSubdistricts([]);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      // Replace this with an API call to fetch subdistricts based on selectedDistrict.
      setSubdistricts(["Subdistrict A1-1", "Subdistrict A1-2"]);
    } else {
      setSubdistricts([]);
    }
    setSelectedSubdistrict("");
  }, [selectedDistrict]);

  const handleSubmit = () => {
    onAddressSelect({
      province: selectedProvince,
      district: selectedDistrict,
      subdistrict: selectedSubdistrict,
    });
  };
  console.log(provinces);

  return (
    <div>
      <h3 className="text-lg font-semibold">Select Address</h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700 mb-1">
            Province
          </label>
          <select
            id="province"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedProvince}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="subdistrict"
            className="block text-sm font-medium text-gray-700 mb-1">
            Subdistrict
          </label>
          <select
            id="subdistrict"
            value={selectedSubdistrict}
            onChange={(e) => setSelectedSubdistrict(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedDistrict}>
            <option value="">Select Subdistrict</option>
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict} value={subdistrict}>
                {subdistrict}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            !selectedProvince || !selectedDistrict || !selectedSubdistrict
          }
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default AddressSelection;
