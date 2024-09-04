// src/pages/HomePage.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../services/igdbApi";
import { GameDetails } from "../types/Game";

const HomePage: React.FC = () => {
  const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<GameDetails[]>([]);

  const handleAddGame = async (game: string) => {
    setFavoriteGames([...favoriteGames, game]);

    try {
      // Fetch games from IGDB
      const results = await fetchGames(game);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching games:", error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  return (
    <div>
      <h1>GGFinder</h1>
      <input
        type="text"
        placeholder="Enter a game you like"
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            const inputElement = e.target as HTMLInputElement;
            const game = inputElement.value;
            handleAddGame(game);
            inputElement.value = ""; // Clear the input field
          }
        }}
      />
      <ul>
        {favoriteGames.map((game, index) => (
          <li key={index}>{game}</li>
        ))}
      </ul>

      <h2>Search Results:</h2>
      <ul>
        {searchResults.map((game) => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>{game.name}</Link> - Rating:{" "}
            {game.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
