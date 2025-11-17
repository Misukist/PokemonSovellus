import { useState } from 'react';
import useNextPokemon from '../utils/imgChange';

const HomePage = () => {

    const [fade, setFade] = useState(false);
    
  const [style, setStyle] = useState({});

  const { pokemons, index, nextPokemon, prevPokemon, pokeNames, pokeCards, handleNextPokemon } = useNextPokemon();


  const handleMouseLeave = () => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  };

  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden bg-neutral-900">

      {/* Taustakuva */}
      <div className="flex inset-0 z-0 items-center justify-center absolute">
        <img 
          src={pokemons[index]} 
          key={index}
          alt="PokemonBG" 
          className="max-w-full h-full object-cover mask-x-from-70% mask-x-to-90% transition-opacity duration-500 ease-in-out opacity-0" 
          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
        />
      </div>

      {/* Keskitetty sisältö */}
      <div className="grow flex items-center justify-between relative z-10 pt-16 px-50">
        <div className="flex flex-col gap-4 items-center">
          <button className="bg-linear-to-r transition duration-500 ease-in-out from-purple-800 to-purple-950 rounded-full px-9 py-4 text-lg md:text-xl lg:text-2xl hover:to-red-600 shadow-lg shadow-neutral-900 hover:shadow-red-500/50">
            Go to the expansion page
          </button>
          <button className="bg-linear-to-r transition duration-500 ease-in-out from-red-800 to-red-950 rounded-full px-9 py-4 text-lg md:text-xl lg:text-2xl hover:to-purple-600 shadow-lg shadow-neutral-900 hover:shadow-purple-500/50">
            See Card Gallery
          </button>
        </div>

        {/* Kortti */}
        <div
          className="relative w-40 md:w-48 lg:w-70 h-auto rounded-xl shadow-2xl transform transition duration-300 hover:scale-110 hover:rotate-3"
        >
          <img 
            src={pokeCards[index]} 
            alt="GengarCard" 
            className="rounded-xl w-full h-full object-cover" 
          />
        </div>
      </div>

      <footer className="bg-neutral-800 backdrop-blur-3xl text-white flex justify-between text-center relative z-10 items-center">
        <button id='leftButton' onClick={prevPokemon} className='py-3 px-5 h-full shadow-xl shadow-neutral-900 transition duration-500 ease-in-out bg-linear-to-r from-red-950 to-red-800 hover:from-red-900 hover:to-red-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
        </button>
        <div>
            <p className='text-base' >{pokeNames[index]}</p>
            <p className='text-xs' >Art by: So-Taro</p>
        </div>
        <button id='rightButton' onClick={nextPokemon} className='py-3 px-5 h-full shadow-xl shadow-neutral-900 transition duration-500 ease-in-out bg-linear-to-r from-red-800 to-red-950 hover:from-red-900 hover:to-red-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </button>
      </footer>

    </div>
  );
};

export default HomePage;
