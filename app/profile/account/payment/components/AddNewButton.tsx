"use client";
import React, { useState } from "react";
import { createUserWithCard } from "./action";

export default function AddNewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">
        + Add New Card
      </button>
      {isModalOpen && <AddModal onClose={closeModal} />}
    </div>
  );
}

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiration_month: 0,
    expiration_year: 0,
    security_code: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCard((prevValues) => ({
      ...prevValues,
      [name]:
        name === "expiration_month" ||
        name === "expiration_year" ||
        name === "security_code"
          ? Number(value)
          : value,
    }));
  };

  const addNewCard = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newCard = await createUserWithCard(card); // Replace with your actual API call
      console.log("Card added successfully:");
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Failed to add card. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        <form onSubmit={addNewCard} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={card.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number:
            </label>
            <input
              type="text"
              name="number"
              value={card.number}
              onChange={handleChange}
              maxLength={16}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4 w-full">
            <div className="w-[40%]">
              <label className="block text-sm font-medium mb-1">
                Exp. Month:
              </label>
              <input
                type="number"
                name="expiration_month"
                value={card.expiration_month || ""}
                onChange={handleChange}
                min={1}
                max={12}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="w-[60%]">
              <label className="block text-sm font-medium mb-1">
                Exp. Year:
              </label>
              <input
                type="number"
                name="expiration_year"
                value={card.expiration_year || ""}
                onChange={handleChange}
                min={new Date().getFullYear()}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Security Code:
            </label>
            <input
              type="number"
              name="security_code"
              value={card.security_code || ""}
              onChange={handleChange}
              min={100}
              max={999}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400 transition">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


