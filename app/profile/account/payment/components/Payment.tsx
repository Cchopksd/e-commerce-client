import React from "react";
import { CardType } from "../enum/cardType";
import { getCard } from "./action";

export default async function Payment() {
  const cardInfo = await getCard();

  const { card } = cardInfo;

  const getBrandImage = (brand: CardType) =>
    `/icons/payment/brands/${brand}.png`;

  return (
    <div>
      {card ? (
        card.map((card: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-4  transition">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-32 h-32 flex items-center justify-center bg-gray-50 rounded-md">
                <img
                  src={getBrandImage(card.brand)}
                  alt={card.brand}
                  className="h-16"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div className="text-lg font-semibold">{card.name}</div>
                <div className="text-sm text-gray-600">
                  Card: **** **** **** {card.last_digits}
                </div>
                <div className="text-sm text-gray-600">
                  Expiry: {card.expiration_month}/{card.expiration_year}
                </div>
              </div>
              <div className="w-full md:w-32 flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h4 className="text-center">Not Found Your Card Information</h4>
        </div>
      )}
    </div>
  );
}
