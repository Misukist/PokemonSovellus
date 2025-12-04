import pokemon from "pokemontcgsdk";
import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();
pokemon.configure({ apiKey: process.env.POKEMON_TCG_KEY });

const cache = new NodeCache({ stdTTL: 600 });

// --- Yleinen cards fetch ---
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

    const result = await pokemon.card.where(options);
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

// --- Funktio fetchaa kortit tietystä setistä ---
const fetchSet = async (setId) => {
  const cacheKey = `set_${setId}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const result = await pokemon.card.where({ q: `set.id:${setId}`, pageSize: 50 });
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
    return cards;
  } catch (err) {
    console.error(`Failed to fetch set ${setId}:`, err);
    throw err;
  }
};

// --- Exportataan kolme settiä ---
export const getMegaEvolutionSet = async (req, res) => {
  try {
    const cards = await fetchSet("me1"); // Mega Evolution set
    res.json(cards);
  } catch {
    res.status(500).json({ error: "Failed to fetch Mega Evolution set" });
  }
};

export const getPhantasmalFlamesSet = async (req, res) => {
  try {
    const cards = await fetchSet("me2"); // Phantasmal Flames set
    res.json(cards);
  } catch {
    res.status(500).json({ error: "Failed to fetch Phantasmal Flames set" });
  }
};

export const getBlackBoltWhiteFlaresSet = async (req, res) => {
  try {
    const cards = await fetchSet("zsv10pt5"); // Black Bolt & White Flares set
    res.json(cards);
  } catch {
    res.status(500).json({ error: "Failed to fetch Black Bolt & White Flares set" });
  }
};
