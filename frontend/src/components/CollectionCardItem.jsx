const CollectionCardItem = ({ card, onDeleteCard }) => {
  return (
    <div className="relative group p-2 rounded overflow-hidden ">
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover delete button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDeleteCard(card._id)}
          className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {/* Roskapöntön SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Kortin nimi */}
      <h3 className="text-center mt-2 font-semibold text-white">{card.name}</h3>

      {card.types && (
        <p className="text-center text-sm text-gray-300">
          {card.types.join(", ")}
        </p>
      )}
    </div>
  );
};


export default CollectionCardItem;



