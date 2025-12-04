import React, { useState, useEffect, useRef } from "react";
import CardListItem from "../../components/CardListItem";

const PhantasmalFlamesPage = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const pageSize = 20;

  // Fetch Phantasmal Flames cards from backend
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cards/phantasmal-flames?page=${page}&pageSize=${pageSize}`);
        const data = await res.json();
        console.log("Fetched cards:", data.length, data);

        if (Array.isArray(data)) {
          setCards(prev => [...prev, ...data]);
        }
      } catch (err) {
        console.error("Failed to fetch Phantasmal Flames cards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) setPage(prev => prev + 1);
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [loading]);

  return (
    <div className="relative flex flex-col min-h-screen text-white bg-neutral-900">
      <div className="relative z-10">
        {/* Header */}
        <div className="w-full p-4 shadow-md bg-linear-to-r from-slate-950 via-red-950/60 to-slate-950">
          <h2 className="text-white text-xl font-bold">Phantasmal Flames</h2>
        </div>

        <div className="bg-linear-to-r h-1 mb-9 from-red-900 via-purple-950 to-red-900" />

        {/* Cards */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
          {cards.map((card, index) => (
            <CardListItem
              key={`${card.id}-${index}`}
              card={{
                id: card.id,
                name: card.name,
                imageUrl: card.imageUrl,
                types: card.types || [],
                hp: card.hp || null,
              }}
              onSaveCard={() => console.log("Save", card)}
            />
          ))}
        </ul>

        <div ref={loader} className="text-center py-4">
          {loading ? "Loading more cards..." : "Scroll to load more"}
        </div>
      </div>
    </div>
  );
};

export default PhantasmalFlamesPage;
