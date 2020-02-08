const Cards = use("App/engine/cards");

function shuffleCards() {
  const array = Cards;
  array.sort(() => Math.random() - 0.5);
}
module.exports = shuffleCards;
