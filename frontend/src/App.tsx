import { useEffect, useState } from "react";
import { cards, Card as CardType } from "./data/cards";
import Card from "./components/Card";
import Jauges from "./components/Jauges";
import { getJauges, saveJauges } from "./utils/storage";

function App() {
  const [index, setIndex] = useState(0);
  const [jauges, setJauges] = useState(getJauges());
  const [gameOver, setGameOver] = useState(false);

  const handleChoix = (effets: any) => {
    const newJauges = { ...jauges };
    for (const [cle, val] of Object.entries(effets)) {
      newJauges[cle as keyof typeof jauges] += val;
      newJauges[cle as keyof typeof jauges] = Math.max(
        0,
        Math.min(100, newJauges[cle as keyof typeof jauges])
      );
    }

    // Vérifie si une jauge est à 0 ou 100
    const jaugePerdue = Object.entries(newJauges).find(
      ([_, valeur]) => valeur <= 0 || valeur >= 100
    );

    if (jaugePerdue) {
      setGameOver(true);
    } else {
      setJauges(newJauges);
      saveJauges(newJauges);
      setIndex((prev) => (prev + 1) % cards.length);
    }
  };

  const handleRestart = () => {
    const resetJauges = {
      peuple: 50,
      trésor: 50,
      foi: 50,
      armée: 50,
    };
    setJauges(resetJauges);
    saveJauges(resetJauges);
    setIndex(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      {!gameOver ? (
        <>
          <Jauges jauges={jauges} />
          <Card card={cards[index]} onChoix={handleChoix} />
        </>
      ) : (
        <div className="text-center bg-white p-6 rounded-xl shadow-xl max-w-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Fin du règne</h1>
          <p className="text-lg mb-6">
            Une de vos décisions a mené le royaume à sa perte...
          </p>
          <button
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-bold"
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
