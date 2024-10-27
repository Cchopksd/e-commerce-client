import React, { ReactNode } from "react";

// Define the interface for the modal props
interface ModalProps {
  children: ReactNode; // Define children as ReactNode
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
