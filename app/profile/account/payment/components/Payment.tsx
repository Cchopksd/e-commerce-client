import React from "react";
import { CardType } from "../enum/cardType";
import { getCard } from "./action";
import Image from "next/image";
import PaymentList from "./CardList";

interface Card {
  brand: string;
  name: string;
  last_digits: string;
  expiration_month: number;
  expiration_year: number;
}

export default async function Payment() {
  const cardInfo = await getCard();

  const { card } = cardInfo;

  return (
    <div>
      <PaymentList cardsList={card} />
    </div>
  );
}
