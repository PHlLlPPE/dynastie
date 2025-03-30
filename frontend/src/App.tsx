import { useState } from "react";
import { cards } from "./data/cards";
import Card from "./components/Card";
import Jauges from "./components/Jauges";
import { getJauges, saveJauges } from "./utils/storage";

function App() {
  const [index, setIndex] = useState(0);
  const [jauges, setJauges] = useState(getJauges());
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [historique, setHistorique] = useState<number[]>([]);

  const handleChoix = (effets: any) => {
    const newJauges = { ...jauges };

    // Appliquer les effets
    for (const [cle, val] of Object.entries(effets)) {
      newJauges[cle as keyof typeof jauges] += val;
      newJauges[cle as keyof typeof jauges] = Math.max(
        0,
        Math.min(100, newJauges[cle as keyof typeof jauges])
      );
    }

    // Vérifie si une jauge atteint 0 ou 100
    const jaugePerdue = Object.entries(newJauges).find(
      ([_, valeur]) => valeur <= 0 || valeur >= 100
    );

    if (jaugePerdue) {
      setGameOver(true);
    } else {
      // Sauvegarde et passe à une nouvelle carte
      setJauges(newJauges);
      saveJauges(newJauges);
      const nouvelHistorique = [...historique, cards[index].id];
      setHistorique(nouvelHistorique);

      // Filtrer les cartes valides
      const cartesValides = cards.filter(
        (c) =>
          !c.condition || c.condition(newJauges, nouvelHistorique)
      );

      // Choisir aléatoirement parmi les cartes valides
      const nextIndex = Math.floor(Math.random() * cartesValides.length);
      setIndex(nextIndex);
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
    setHistorique([]);
    setIndex(0);
    setGameOver(false);
    setStarted(true);
  };

  const handleStart = () => {
    handleRestart();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      {!started ? (
        <div className="text-center bg-white p-6 rounded-xl shadow-xl max-w-lg">
          <h1 className="text-3xl font-bold mb-4">Dynastie</h1>
          <p className="text-lg mb-6">
            Prenez des décisions cruciales pour votre royaume. Gardez l’équilibre… ou tombez.
          </p>
          <button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold"
          >
            Commencer la partie
          </button>
        </div>
      ) : !gameOver ? (
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
