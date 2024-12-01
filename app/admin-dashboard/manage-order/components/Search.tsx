"use client";
import React, { useState } from "react";
import Select from "react-select";

interface StatusOption {
  value: string;
  label: string;
}

export default function Search() {
  const [selectedStatus, setSelectedStatus] = useState<StatusOption[]>([]);

  const statusOptions: StatusOption[] = [
    { value: "pending", label: "รอดำเนินการ" },
    { value: "processing", label: "กำลังดำเนินการ" },
    { value: "completed", label: "เสร็จสิ้น" },
    { value: "cancelled", label: "ยกเลิก" },
  ];

  const handleStatusChange = (options: readonly StatusOption[]) => {
    const selectedOptions = options as StatusOption[];
    setSelectedStatus(selectedOptions);
  };

  return (
    <div className="w-72">
      <Select
        value={selectedStatus}
        onChange={handleStatusChange}
        options={statusOptions}
        placeholder="เลือกสถานะ..."
        isClearable
        isMulti
        className="basic-select"
        classNamePrefix="select"
      />
    </div>
  );
}
