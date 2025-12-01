import pokemon from "pokemontcgsdk";
import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();
pokemon.configure({ apiKey: process.env.POKEMON_TCG_KEY });

const cache = new NodeCache({ stdTTL: 600 });

export const getCards = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const search = req.query.search || "";

  const cacheKey = `cards_${page}_${pageSize}_${search}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const options = { page, pageSize };
    if (search) options.q = `name:${search}*`;

    const result = await pokemon.card.where(options); // SDK palauttaa { data: [...] }
    const cards = result.data.map(card => ({
      id: card.id,
      name: card.name,
      types: card.types,
      hp: card.hp,
      imageUrl: card.images.small,
      evolvesFrom: card.evolvesFrom,
      artist: card.artist
    }));

    cache.set(cacheKey, cards);
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Pokémon cards" });
  }
};
