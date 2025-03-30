import { Card as CardType } from "../data/cards";

interface Props {
  card: CardType;
  onChoix: (effets: any) => void;
}

export default function Card({ card, onChoix }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2">{card.personnage}</h2>
      <p className="mb-6 text-lg">{card.texte}</p>
      <div className="flex justify-between gap-4">
        <button
          onClick={() => onChoix(card.choixGauche.effets)}
          className="bg-red-200 hover:bg-red-300 px-4 py-2 rounded font-bold w-1/2"
        >
          {card.choixGauche.texte}
        </button>
        <button
          onClick={() => onChoix(card.choixDroit.effets)}
          className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded font-bold w-1/2"
        >
          {card.choixDroit.texte}
        </button>
      </div>
    </div>
  );
}
