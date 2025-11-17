import { useState, useEffect } from "react";
import Chandelure from "../assets/So-taro_Chandelure.jpg";
import Gengar from "../assets/So-taro_Gengar.jpg";
import Misdreavus from "../assets/So-taro_Misdreavus.jpg";
import Chandelure_Card from "../assets/Chandelure_Card.jpg";
import Gengar_Card from "../assets/Gengar_Card.jpg";
import Misdreavus_Card from "../assets/Misdreavus_Card.jpg";

export default function useNextPokemon() {
  const pokeCards = [Misdreavus_Card, Gengar_Card, Chandelure_Card];
  const pokeNames = ["Misdreavus Rare", "Gengar Rare", "Chandelure Rare"];
  const pokemons = [Misdreavus, Gengar, Chandelure];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    [...pokemons, ...pokeCards].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleNextPokemon = () => {
    setIndex((prev) => (prev + 1) % pokemons.length);
  };

  const handlePrevPokemon = () => {
    setIndex((prev) => (prev - 1 + pokemons.length) % pokemons.length);
  };

  const nextPokemon = async () => {
    setFade(false); // fade out
    await new Promise((resolve) => setTimeout(resolve, 300)); // odota fade duration
    handleNextPokemon();
    setFade(true); // fade in
  };

  const prevPokemon = async () => {
    setFade(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    handlePrevPokemon();
    setFade(true);
  };

/*   // Automatisoitu vaihtaminen
  useEffect(() => {
    const interval = setInterval(() => {
      nextPokemon();
    }, 10000); // 5 sekunnin välein
    return () => clearInterval(interval); // cleanup
  }, [index]); // riippuvuus indexistä */

  return { nextPokemon, prevPokemon, index, pokemons, pokeNames, pokeCards, fade };
}
