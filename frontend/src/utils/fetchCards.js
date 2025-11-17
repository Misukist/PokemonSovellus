import { useState, useEffect } from "react";

const useFetchCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/cards?page=2`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCards(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Preload-kuvat välimuistiin
  useEffect(() => {
    cards.forEach(card => {
      if (card.images && card.images.large) {
        const img = new Image();
        img.src = card.images.large;
      }
    });
  }, [cards]);

  return { cards, loading, error };
};

export default useFetchCards;
