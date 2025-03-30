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
    condition?: (jauges: Effets, choixHistorique: number[]) => boolean;
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
    {
      id: 3,
      personnage: "Moine érudit",
      texte: "L’église souhaite restaurer une abbaye. Aidez-nous ?",
      choixGauche: {
        texte: "Trop coûteux",
        effets: {
          foi: -15,
          trésor: +5,
        },
      },
      choixDroit: {
        texte: "Accordé",
        effets: {
          foi: +20,
          trésor: -10,
        },
      },
    },
    {
      id: 4,
      personnage: "Moine érudit",
      texte: "Merci pour votre aide ! Nous avons trouvé d’anciens manuscrits.",
      choixGauche: {
        texte: "Offrez-les à l’université",
        effets: {
          foi: +5,
          peuple: +10,
        },
      },
      choixDroit: {
        texte: "Gardez-les secrets",
        effets: {
          foi: +10,
          armée: +5,
        },
      },
      condition: (jauges, historique) => historique.includes(3),
    },
    {
      id: 5,
      personnage: "Capitaine de la garde",
      texte: "Nos soldats sont plus nombreux que jamais. Partir en conquête ?",
      choixGauche: {
        texte: "Non",
        effets: {
          armée: -10,
        },
      },
      choixDroit: {
        texte: "Oui",
        effets: {
          armée: -20,
          trésor: +20,
        },
      },
      condition: (jauges) => jauges.armée >= 70,
    },
    {
      id: 6,
      personnage: "Ambassadeur du Nord",
      texte: "Le roi du Nord souhaite une alliance commerciale.",
      choixGauche: {
        texte: "Refuser",
        effets: {
          trésor: -5,
          armée: +5,
        },
      },
      choixDroit: {
        texte: "Accepter",
        effets: {
          trésor: +10,
          peuple: +5,
        },
      },
    },
    {
      id: 7,
      personnage: "Sorcier du château",
      texte: "J’ai prédit un mauvais présage. Dois-je effectuer un rituel ?",
      choixGauche: {
        texte: "Superstition !",
        effets: {
          foi: -10,
        },
      },
      choixDroit: {
        texte: "Faites-le",
        effets: {
          foi: +10,
          trésor: -10,
        },
      },
    },
    {
      id: 8,
      personnage: "Chef du village",
      texte: "La famine guette. Ouvrir les greniers royaux ?",
      choixGauche: {
        texte: "Non",
        effets: {
          peuple: -20,
        },
      },
      choixDroit: {
        texte: "Oui",
        effets: {
          peuple: +15,
          trésor: -15,
        },
      },
    },
    {
      id: 9,
      personnage: "Femme mystérieuse",
      texte: "Je peux vous révéler un secret… en échange de quelques pièces.",
      choixGauche: {
        texte: "Dégagez !",
        effets: {
          peuple: -5,
        },
      },
      choixDroit: {
        texte: "Tenez",
        effets: {
          trésor: -5,
          armée: +10,
        },
      },
    },
    {
      id: 10,
      personnage: "Femme mystérieuse",
      texte: "Votre confiance sera récompensée. Une carte cachée vous est révélée.",
      choixGauche: {
        texte: "Merci",
        effets: {
          armée: +5,
        },
      },
      choixDroit: {
        texte: "Je n’ai pas besoin d’aide",
        effets: {},
      },
      condition: (_, historique) => historique.includes(9),
    },
  ];
  