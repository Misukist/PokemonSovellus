import React from "react";
import PropTypes from "prop-types";

const CardListItem = ({ card, onSaveCard }) => {
  return (
    <div className="relative group p-2 rounded overflow-hidden">
      {/* Kuva backendin imageUrl kentästä */}
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      {/* Hover button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onSaveCard && onSaveCard(card)}
          className="w-12 h-12 rounded-full bg-purple-600 text-white text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          +
        </button>
      </div>
      {/* Kortin nimi */}
      <h3 className="text-center mt-2 font-semibold text-white">{card.name}</h3>
      {card.types && (
        <p className="text-center text-sm text-gray-300">{card.types.join(", ")}</p>
      )}
    </div>
  );
};

CardListItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired, // <-- tärkeää, backend antaa tämän
    types: PropTypes.arrayOf(PropTypes.string),
    hp: PropTypes.string,
    evolvesFrom: PropTypes.string,
    artist: PropTypes.string,
  }).isRequired,
  onSaveCard: PropTypes.func,
};

export default CardListItem;
