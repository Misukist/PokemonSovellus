import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CardListItem = ({ card }) => {
  const navigate = useNavigate();

  const saveCard = async () => {
    try {
      const res = await fetch("/api/collection/save", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: card.id,
          name: card.name,
          imageUrl: card.imageUrl,
          types: card.types || [],
          hp: card.hp || null,
          evolvesFrom: card.evolvesFrom || null,
          artist: card.artist || null,
        }),
      });

      const data = await res.json();

      //EI KIRJAUTUNUT → OHJAUS SIGN IN
      if (res.status === 401 || data?.error === "Not authenticated") {
        alert("Please sign in first!");
        navigate("/signin");
        return;
      }

      // DUPLICATE
      if (!res.ok && data?.error?.toLowerCase().includes("already")) {
        alert("Card is already in your collection!");
        return;
      }

      // MUU VIRHE
      if (!res.ok) {
        console.error("Save error:", data);
        alert(data?.error || "Failed to save card");
        return;
      }

      // ONNISTUI
      alert("Card added to collection!");
    } catch (err) {
      console.error("Network error:", err);
      alert("Server error while saving the card");
    }
  };

  return (
    <div className="relative group p-2 rounded overflow-hidden">
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={saveCard}
          className="w-12 h-12 rounded-full bg-purple-600 text-white text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          +
        </button>
      </div>

      {/* Kortin nimi */}
      <h3 className="text-center mt-2 font-semibold text-white">
        {card.name}
      </h3>

      {card.types && (
        <p className="text-center text-sm text-gray-300">
          {card.types.join(", ")}
        </p>
      )}
    </div>
  );
};

CardListItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string),
    hp: PropTypes.string,
    evolvesFrom: PropTypes.string,
    artist: PropTypes.string,
  }).isRequired,
};

export default CardListItem;
