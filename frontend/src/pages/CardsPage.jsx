import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardList from "../components/CardList";

const CardsPage = ({ authUser }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  // Debounce: odota 500ms ennen kuin päivitämme debouncedSearch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const handleAuthError = () => {
    alert("Please sign in first!");
    navigate("/signin");
  };

  // Lisää kortti backendin collectioniin
  const handleAddCard = async (card) => {
    if (!authUser) {
      handleAuthError();
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/collection/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(card),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes("Not authenticated")) {
          handleAuthError();
        } else if (data.error?.includes("duplicate")) {
          alert("Card is already in your collection!");
        } else {
          alert(data.error || "Failed to add card");
        }
        return;
      }

      alert("Card added to collection!");
    } catch (err) {
      console.error(err);
      alert("Server error while saving the card");
    }
  };

  // Poista kortti backendistä
  const handleDeleteCard = async (cardId) => {
    if (!authUser) {
      handleAuthError();
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/collection/${cardId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete card");
        return;
      }

      alert("Card removed from collection!");
    } catch (err) {
      console.error(err);
      alert("Server error while deleting the card");
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white bg-neutral-900">
      <div className="relative z-10">
        {/* Ylin palkki: otsikko + search */}
        <div className="w-full p-4 flex flex-col md:flex-row items-center justify-between shadow-md bg-linear-to-r from-slate-950 via-red-950/60 to-slate-950">
          <h2 className="text-white text-xl font-bold mb-2 md:mb-0">
            All Cards
          </h2>

          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search cards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md border bg-slate-900/70 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-900 hover:ring-1 hover:bg-slate-950/70 focus:bg-slate-950 transition-all duration-200"
            />
          </div>
        </div>

        <div className="bg-linear-to-r h-1 mb-9 from-red-900 via-purple-950 to-red-900" />

        {/* Card lista */}
        <CardList
          search={debouncedSearch}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
        />
      </div>
    </div>
  );
};

export default CardsPage;
