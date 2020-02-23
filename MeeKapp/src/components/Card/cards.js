const cardSuit = {
  Clubs: 4,
  Hearts: 3,
  Spade: 2,
  Diamonds: 1,
};

const cardNumber = {
  Four: 1,
  Five: 2,
  Six: 3,
  Seven: 4,
  Eight: 5,
  Nine: 6,
  Ten: 7,
  Queen: 8,
  Jack: 9,
  King: 10,
  Ace: 11,
  Two: 12,
  Three: 13,
  Shackle: 14,
};

const cardSymbol = {
  Four: '4',
  Five: '5',
  Six: '6',
  Seven: '7',
  Eight: '8',
  Nine: '9',
  Ten: '10',
  Queen: 'Q',
  Jack: 'J',
  King: 'K',
  Ace: 'A',
  Two: '2',
  Three: '3',
};

export const cards = [
  {
    id: 1,
    number: cardNumber.Ace,
    suit: cardSuit.Clubs,
    symbol: cardSymbol.Ace,
    isShackle: false,
  },
  {
    id: 2,
    number: cardNumber.Ace,
    suit: cardSuit.Hearts,
    symbol: cardSymbol.Ace,
    isShackle: false,
  },
  {
    id: 3,
    number: cardNumber.Ace,
    symbol: cardSymbol.Ace,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 4,
    number: cardNumber.Ace,
    symbol: cardSymbol.Ace,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 2
  {
    id: 5,
    number: cardNumber.Two,
    symbol: cardSymbol.Two,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 6,
    number: cardNumber.Two,
    symbol: cardSymbol.Two,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 7,
    number: cardNumber.Two,
    symbol: cardSymbol.Two,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 8,
    number: cardNumber.Two,
    symbol: cardSymbol.Two,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 3
  {
    id: 9,
    number: cardNumber.Three,
    symbol: cardSymbol.Three,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 10,
    number: cardNumber.Three,
    symbol: cardSymbol.Three,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 11,
    number: cardNumber.Three,
    symbol: cardSymbol.Three,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 12,
    number: cardNumber.Three,
    symbol: cardSymbol.Three,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 4
  {
    id: 13,
    number: cardNumber.Four,
    symbol: cardSymbol.Four,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 14,
    number: cardNumber.Four,
    symbol: cardSymbol.Four,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 15,
    number: cardNumber.Four,
    symbol: cardSymbol.Four,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 16,
    number: cardNumber.Four,
    symbol: cardSymbol.Four,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 5
  {
    id: 17,
    number: cardNumber.Five,
    symbol: cardSymbol.Five,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 18,
    number: cardNumber.Five,
    symbol: cardSymbol.Five,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 19,
    number: cardNumber.Five,
    symbol: cardSymbol.Five,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 20,
    number: cardNumber.Five,
    symbol: cardSymbol.Five,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 6
  {
    id: 21,
    number: cardNumber.Six,
    symbol: cardSymbol.Six,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 22,
    number: cardNumber.Six,
    symbol: cardSymbol.Six,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 23,
    number: cardNumber.Six,
    symbol: cardSymbol.Six,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 24,
    number: cardNumber.Six,
    symbol: cardSymbol.Six,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 7
  {
    id: 25,
    number: cardNumber.Seven,
    symbol: cardSymbol.Seven,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 26,
    number: cardNumber.Seven,
    symbol: cardSymbol.Seven,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 27,
    number: cardNumber.Seven,
    symbol: cardSymbol.Seven,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 28,
    number: cardNumber.Seven,
    symbol: cardSymbol.Seven,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 8
  {
    id: 29,
    number: cardNumber.Eight,
    symbol: cardSymbol.Eight,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 30,
    number: cardNumber.Eight,
    symbol: cardSymbol.Eight,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 31,
    number: cardNumber.Eight,
    symbol: cardSymbol.Eight,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 32,
    number: cardNumber.Eight,
    symbol: cardSymbol.Eight,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 9
  {
    id: 33,
    number: cardNumber.Nine,
    symbol: cardSymbol.Nine,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 34,
    number: cardNumber.Nine,
    symbol: cardSymbol.Nine,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 35,
    number: cardNumber.Nine,
    symbol: cardSymbol.Nine,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 36,
    number: cardNumber.Nine,
    symbol: cardSymbol.Nine,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // 10
  {
    id: 37,
    number: cardNumber.Ten,
    symbol: cardSymbol.Ten,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 38,
    number: cardNumber.Ten,
    symbol: cardSymbol.Ten,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 39,
    number: cardNumber.Ten,
    symbol: cardSymbol.Ten,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 40,
    number: cardNumber.Ten,
    symbol: cardSymbol.Ten,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // Q
  {
    id: 41,
    number: cardNumber.Queen,
    symbol: cardSymbol.Queen,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 42,
    number: cardNumber.Queen,
    symbol: cardSymbol.Queen,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 43,
    number: cardNumber.Queen,
    symbol: cardSymbol.Queen,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 44,
    number: cardNumber.Queen,
    symbol: cardSymbol.Queen,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // J
  {
    id: 45,
    number: cardNumber.Jack,
    symbol: cardSymbol.Jack,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 46,
    number: cardNumber.Jack,
    symbol: cardSymbol.Jack,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 47,
    number: cardNumber.Jack,
    symbol: cardSymbol.Jack,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 48,
    number: cardNumber.Jack,
    symbol: cardSymbol.Jack,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },

  // K
  {
    id: 49,
    number: cardNumber.King,
    symbol: cardSymbol.King,
    suit: cardSuit.Clubs,
    isShackle: false,
  },
  {
    id: 50,
    number: cardNumber.King,
    symbol: cardSymbol.King,
    suit: cardSuit.Hearts,
    isShackle: false,
  },
  {
    id: 51,
    number: cardNumber.King,
    symbol: cardSymbol.King,
    suit: cardSuit.Spade,
    isShackle: false,
  },
  {
    id: 52,
    number: cardNumber.King,
    symbol: cardSymbol.King,
    suit: cardSuit.Diamonds,
    isShackle: false,
  },
];
