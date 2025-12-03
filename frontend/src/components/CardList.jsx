import React, { useState, useEffect, useRef } from "react";
import CardListItem from "./CardListItem.jsx";

const CardList = ({ search }) => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const pageSize = 20;

  const saveToCache = (cardsArray, searchTerm) => {
    sessionStorage.setItem(`cachedCards-${searchTerm}`, JSON.stringify(cardsArray));
  };

  const loadFromCache = (searchTerm) => {
    const cached = sessionStorage.getItem(`cachedCards-${searchTerm}`);
    return cached ? JSON.parse(cached) : [];
  };

  const handleSaveCard = (card) => {
    console.log("Saved card:", card);
  };

  // Kun search muuttuu, nollataan kortit ja ladataan cache
  useEffect(() => {
    setPage(1);
    const cachedCards = loadFromCache(search);
    setCards(cachedCards || []);
  }, [search]);

  // Fetch kortit API:sta
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/cards?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCards(prev => {
            const combined = page === 1 ? data : [...prev, ...data];
            // poista duplikaatit
            const unique = combined.filter(
              (v, i, a) => a.findIndex(c => c.id === v.id) === i
            );
            saveToCache(unique, search);
            return unique;
          });
        } else {
          console.error("API returned invalid data:", data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [page, search]);

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
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {cards.map((card, index) => (
          <CardListItem
            key={`${card.id}-${index}`}
            card={card}
            onSaveCard={handleSaveCard}
          />
        ))}
      </ul>
      <div ref={loader} className="text-center py-4">
        {loading ? "Loading more cards..." : "Scroll to load more"}
      </div>
    </div>
  );
};

export default CardList;
