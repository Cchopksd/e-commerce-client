"use client";
import React, { useState } from "react";
import { createUserWithCard } from "./action";

export default function AddNewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className='px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <rect
            width='20'
            height='14'
            x='2'
            y='5'
            rx='2'
          />
          <line
            x1='2'
            x2='22'
            y1='10'
            y2='10'
          />
        </svg>
        Add Payment Method
      </button>
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiration_month: "",
    expiration_year: "",
    security_code: "",
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    if (value) {
    }
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Reset any form errors when user is typing
    if (formError) setFormError("");

    if (name === "number") {
      setCard((prev) => ({
        ...prev,
        [name]: formatCardNumber(value),
      }));
    } else {
      setCard((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!card.name.trim()) return "Cardholder name is required";
    if (card.number.replace(/\s+/g, "").length < 15)
      return "Please enter a valid card number";
    if (
      !card.expiration_month ||
      parseInt(card.expiration_month) < 1 ||
      parseInt(card.expiration_month) > 12
    )
      return "Please enter a valid expiration month";

    const currentYear = new Date().getFullYear();
    const twoDigitYear = parseInt(card.expiration_year);
    const fullYear = twoDigitYear < 100 ? 2000 + twoDigitYear : twoDigitYear;

    if (!card.expiration_year || fullYear < currentYear)
      return "Please enter a valid expiration year";

    if (!card.security_code || card.security_code.length < 3)
      return "Please enter a valid security code";

    return "";
  };

  const addNewCard = async (event: React.FormEvent) => {
    event.preventDefault();

    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert string values to numbers where needed
      const cardData = {
        name: card.name,
        number: card.number.replace(/\s+/g, ""),
        expiration_month: parseInt(card.expiration_month),
        expiration_year: parseInt(card.expiration_year),
        security_code: parseInt(card.security_code),
      };

      await createUserWithCard(cardData);
      window.location.reload();
    } catch (error) {
      console.error("Error adding card:", error);
      setFormError(
        "Failed to add card. Please check your information and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Detect card type based on first digits
  const getCardType = () => {
    const cardNumber = card.number.replace(/\s+/g, "");
    if (!cardNumber) return null;

    if (cardNumber.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "Mastercard";
    if (/^3[47]/.test(cardNumber)) return "Amex";
    if (/^6(?:011|5)/.test(cardNumber)) return "Discover";
    return null;
  };

  const cardType = getCardType();

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Add Payment Method</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
            aria-label='Close'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 6L6 18M6 6l12 12' />
            </svg>
          </button>
        </div>

        {formError && (
          <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm'>
            {formError}
          </div>
        )}

        <form
          onSubmit={addNewCard}
          className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Cardholder Name
            </label>
            <input
              type='text'
              name='name'
              value={card.name}
              onChange={handleChange}
              placeholder='Name as shown on card'
              autoComplete='cc-name'
              required
              className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Card Number
            </label>
            <div className='relative'>
              <input
                type='text'
                name='number'
                value={card.number}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder='1234 5678 9012 3456'
                maxLength={19}
                autoComplete='cc-number'
                required
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
              />
              {cardType && (
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600'>
                  {cardType}
                </div>
              )}
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Expiration Date
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  name='expiration_month'
                  value={card.expiration_month}
                  onChange={handleChange}
                  placeholder='MM'
                  maxLength={2}
                  autoComplete='cc-exp-month'
                  required
                  className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <span className='flex items-center text-gray-500'>/</span>
                <input
                  type='text'
                  name='expiration_year'
                  value={card.expiration_year}
                  onChange={handleChange}
                  placeholder='YY'
                  maxLength={2}
                  autoComplete='cc-exp-year'
                  required
                  className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>

            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                CVC/CVV
              </label>
              <input
                type='password'
                name='security_code'
                value={card.security_code}
                onChange={handleChange}
                placeholder='123'
                maxLength={4}
                autoComplete='cc-csc'
                required
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          <div className='text-xs text-gray-500 mt-2'>
            Your card information is encrypted and secure. We never store your
            full card details.
          </div>

          <div className='flex justify-end space-x-2 pt-2'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition'>
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition flex items-center gap-2'>
              {isSubmitting ? (
                <>
                  <svg
                    className='animate-spin h-4 w-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Add Card"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
