"use client";
import React, { useState, useEffect } from "react";

const AddressSelection = ({
  onAddressSelect,
  addressData,
}: {
  onAddressSelect: any;
  addressData: any;
}) => {
  const [provinces, setProvinces] = useState(addressData.province || []);
  const [districts, setDistricts] = useState(addressData.district || []);
  const [subdistricts, setSubdistricts] = useState(
    addressData.subdistrict || [],
  );

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
        );
        const provinceData = await response.json();
        setProvinces(provinceData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
    fetchProvinces();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (!selectedProvince) return;

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json",
        );
        const districtData = await response.json();
        const filteredDistricts = districtData.filter(
          (item: { province_id: number }) =>
            item.province_id === Number(selectedProvince),
        );
        setDistricts(filteredDistricts);
        setSelectedDistrict(""); // Reset dependent selections
        setSubdistricts([]);
        setSelectedSubdistrict("");
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    async function fetchSubdistricts() {
      if (!selectedDistrict) return;

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json",
        );
        const subdistrictData = await response.json();
        const filteredSubdistricts = subdistrictData.filter(
          (item: { amphure_id: number }) =>
            item.amphure_id === Number(selectedDistrict),
        );
        setSubdistricts(filteredSubdistricts);
        setSelectedSubdistrict(""); // Reset dependent selection
      } catch (error) {
        console.error("Error fetching subdistricts:", error);
      }
    }
    fetchSubdistricts();
  }, [selectedDistrict]);

  const handleSubmit = () => {
    const provinceName =
      provinces.find((p: any) => p.id === Number(selectedProvince))?.name_th ||
      "";
    const districtName =
      districts.find((d: any) => d.id === Number(selectedDistrict))?.name_th ||
      "";
    const subdistrictName =
      subdistricts.find((s: any) => s.id === Number(selectedSubdistrict))
        ?.name_th || "";

    onAddressSelect({
      province: provinceName,
      district: districtName,
      subdistrict: subdistrictName,
    });
  };

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
            {provinces.map((province: any) => (
              <option key={province.id} value={province.id}>
                {province.name_th}
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
            {districts.map((district: any) => (
              <option key={district.id} value={district.id}>
                {district.name_th}
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
            {subdistricts.map((subdistrict: any) => (
              <option key={subdistrict.id} value={subdistrict.id}>
                {subdistrict.name_th}
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
