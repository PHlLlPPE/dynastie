export interface Card {
    id: number;
    personnage: string;
    texte: string;
    choixGauche: {
      texte: string;
      effets: Effets;
    };
    choixDroit: {
      texte: string;
      effets: Effets;
    };
  }
  
  export interface Effets {
    peuple?: number;
    trésor?: number;
    foi?: number;
    armée?: number;
  }
  
  export const cards: Card[] = [
    {
      id: 1,
      personnage: "Conseiller royal",
      texte: "Le peuple demande une réduction des impôts.",
      choixGauche: {
        texte: "Refuser",
        effets: {
          peuple: -15,
          trésor: +10,
        },
      },
      choixDroit: {
        texte: "Accepter",
        effets: {
          peuple: +10,
          trésor: -10,
        },
      },
    },
    {
      id: 2,
      personnage: "Capitaine de la garde",
      texte: "Des brigands pillent les routes. Envoyer l’armée ?",
      choixGauche: {
        texte: "Non",
        effets: {
          peuple: -10,
          armée: +5,
        },
      },
      choixDroit: {
        texte: "Oui",
        effets: {
          armée: -10,
          peuple: +5,
        },
      },
    },
  ];
  