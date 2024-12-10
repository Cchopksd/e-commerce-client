"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

// Define the interface for the modal props
interface ModalProps {
  children: ReactNode; // Define children as ReactNode
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <div className="bg-white p-1 relative">
          <button
            onClick={handleCloseModal}
            className="shadow-lg bg-white absolute rounded-full p-1 right-2">
            <X />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
