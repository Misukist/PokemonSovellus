import useFetchCards from "../utils/fetchCards.js";

const CardList = () => {
  const { cards, loading } = useFetchCards();

  if (loading) return <p className="text-white text-center mt-10">Loading cards...</p>;

  // Turvallinen tarkistus, jos cards ei ole taulukko
  if (!Array.isArray(cards) || cards.length === 0) {
    return <p className="text-white text-center mt-10">No cards found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {cards.map((card) =>
        card.id && card.name ? (
          <div key={card.id} className="relative w-full h-auto rounded-xl shadow-2xl">
            <img
              src={card.images?.large}
              alt={card.name}
              className="rounded-xl w-full h-full object-cover transition-opacity duration-300 opacity-0"
              onLoad={(e) => (e.currentTarget.style.opacity = 1)}
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default CardList;


