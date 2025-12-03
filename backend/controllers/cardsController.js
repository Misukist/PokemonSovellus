import Card from "../models/Cards.js";

// Lisää kortti kokoelmaan
// cardsController.js
export const addCard = async (req, res) => {
  try {
    const { cardId, name, imageUrl, types, hp, evolvesFrom, artist } = req.body;
    const userId = req.user._id;

    // Tarkista onko kortti jo lisätty tälle käyttäjälle
    const existing = await Card.findOne({ cardId, userId });
    if (existing) {
      return res.status(400).json({ error: "Card already in your collection" });
    }

    const newCard = await Card.create({
      cardId,
      name,
      imageUrl,
      types,
      hp,
      evolvesFrom,
      artist,
      userId,
    });

    res.status(201).json(newCard);
  } catch (err) {
    console.error("Error in addCard:", err);
    res.status(500).json({ error: "Failed to add card" });
  }
};






export const getUserCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user._id }); // <-- käyttäjäkohtainen
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to load collection" });
  }
};

// Poista kortti
export const deleteCard = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // käyttäjä payloadista

  try {
    const card = await Card.findOne({ _id: id, user: userId });
    if (!card) {
      return res.status(404).json({ error: "Card not found or not yours" });
    }

    await card.deleteOne();
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete card" });
  }
};
