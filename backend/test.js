// backend/test.js
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.POKEMON_TCG_KEY;

if (!API_KEY) {
  console.error("Please set POKEMON_TCG_KEY in your .env file");
  process.exit(1);
}

const fetchSets = async () => {
  try {
    const res = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();

    console.log("Available Pokémon TCG sets:\n");

    data.data.forEach((set) => {
      console.log(`Name: ${set.name} | ID: ${set.id}`);
    });

    console.log("\nTotal sets:", data.data.length);
  } catch (err) {
    console.error("Failed to fetch sets:", err);
  }
};

fetchSets();
