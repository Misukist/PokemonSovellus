import React, { useEffect, useState } from "react";
import CollectionCardItem from "../components/CollectionCardItem";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CollectionPage = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Haetaan authUser
  const { data: authUser, isLoading: authLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });
      if (!res.ok) return null;
      return res.json();
    },
    retry: false,
  });

  // Hae kortit omasta collectionista
  const fetchCollection = async () => {
    if (!authUser) return; // jos ei kirjautunut
    try {
      const res = await fetch("http://localhost:3000/api/collection/my-cards", {
        credentials: "include",
      });
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error("Failed to fetch collection:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !authUser) {
      navigate("/signin"); // ohjataan login sivulle
    } else if (authUser) {
      fetchCollection();
    }
  }, [authUser, authLoading, navigate]);

  // Poista kortti backendistä
  const handleDeleteCard = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/collection/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setCards((prev) => prev.filter((c) => c._id !== id));
      alert("Card removed from collection!");
    } catch (err) {
      console.error(err);
      alert("Failed to remove card");
    }
  };

  // Suodata hakusanan perusteella
  const filtered = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen text-white bg-neutral-900">
      <div className="relative z-10">
        {/* Ylin palkki */}
        <div className="w-full p-4 flex flex-col md:flex-row items-center justify-between shadow-md bg-linear-to-r from-slate-950 via-red-950/60 to-slate-950">
          <h2 className="text-white text-xl font-bold mb-2 md:mb-0">
            My Collection
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

        {/* Kortit */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 pb-12">
          {filtered.map((card) => (
            <CollectionCardItem
              key={card._id}
              card={card}
              onDeleteCard={handleDeleteCard}
            />
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-400 col-span-full text-center">
              No cards found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
