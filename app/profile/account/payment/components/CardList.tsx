"use client";
import React, { useState } from "react";
import Image from "next/image";
import AddNewButton from "./AddNewButton";
import { deleteUserCard, getCard } from "./action";

interface Card {
  brand: string;
  card_id: string;
  cust_id: string;
  expiration_month: number;
  expiration_year: number;
  last_digits: string;
  name: string;
  is_default: boolean;
}

export default function PaymentList({ cardsList }: { cardsList: Card[] }) {
  const [cards, setCards] = useState(cardsList);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    cards.find((card) => card.is_default)?.card_id ||
      (cards.length > 0 ? cards[0].card_id : null)
  );
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const getBrandImage = (brand: string) => {
    const brandLower = brand.toLowerCase();
    return `/icons/payment/brands/${brandLower}.png`;
  };

  const handleDeleteCard = async (card: Card) => {
    setIsDeleting(card.card_id);
    try {
      const response = await deleteUserCard({
        card_id: card.card_id,
        cust_id: card.cust_id,
      });

      if (response) {
        const cardInfo = await getCard();
        setCards(cardInfo.card);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const formatCardExpiry = (month: number, year: number) => {
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Check if year is 4 digits, if not, assume it's a 2 digit representation
    const formattedYear =
      year > 1000
        ? year.toString().slice(-2)
        : year.toString().padStart(2, "0");
    return `${formattedMonth}/${formattedYear}`;
  };

  return (
    <div className='space-y-6'>
      {cards && cards.length > 0 ? (
        <div className='space-y-4'>
          {cards.map((card: Card) => (
            <div
              key={card.card_id}
              className={`border rounded-lg p-4 transition hover:shadow-md ${
                selectedCardId === card.card_id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedCardId(card.card_id)}>
              <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-full md:w-24 h-16 flex items-center justify-center bg-white rounded-md border border-gray-100 p-2'>
                  <Image
                    width={60}
                    height={40}
                    src={getBrandImage(card.brand)}
                    alt={card.brand}
                    className='object-contain max-h-10'
                  />
                </div>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <div className='text-lg font-medium'>{card.name}</div>
                    {card.is_default && (
                      <span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
                        Default
                      </span>
                    )}
                  </div>
                  <div className='flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600'>
                    <div className='flex items-center gap-1'>
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
                      <span>•••• {card.last_digits}</span>
                    </div>
                    <div className='flex items-center gap-1'>
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
                          x='3'
                          y='4'
                          width='18'
                          height='18'
                          rx='2'
                          ry='2'
                        />
                        <line
                          x1='16'
                          y1='2'
                          x2='16'
                          y2='6'
                        />
                        <line
                          x1='8'
                          y1='2'
                          x2='8'
                          y2='6'
                        />
                        <line
                          x1='3'
                          y1='10'
                          x2='21'
                          y2='10'
                        />
                      </svg>
                      <span>
                        Expires{" "}
                        {formatCardExpiry(
                          card.expiration_month,
                          card.expiration_year
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-auto flex md:flex-col gap-2 mt-4 md:mt-0'>
                  {!card.is_default && (
                    <button className='px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex-1 text-sm'>
                      Set Default
                    </button>
                  )}
                  <button
                    disabled={isDeleting === card.card_id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(card);
                    }}
                    className='px-3 py-1.5 border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex-1 text-sm flex items-center justify-center gap-1'>
                    {isDeleting === card.card_id ? (
                      <>
                        <svg
                          className='animate-spin h-4 w-4'
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
                        <span>Removing...</span>
                      </>
                    ) : (
                      <>
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
                          <path d='M3 6h18' />
                          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                          <line
                            x1='10'
                            y1='11'
                            x2='10'
                            y2='17'
                          />
                          <line
                            x1='14'
                            y1='11'
                            x2='14'
                            y2='17'
                          />
                        </svg>
                        <span>Remove</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='border border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 bg-gray-50 text-center'>
          <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400'>
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
          </div>
          <div>
            <h4 className='text-lg font-medium text-gray-700'>
              No Payment Methods Found
            </h4>
            <p className='text-gray-500 mt-1'>
              Add a credit or debit card to manage your payments
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
