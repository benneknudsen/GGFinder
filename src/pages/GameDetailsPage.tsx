// src/pages/GameDetailsPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../services/igdbApi"; // You need to implement this function

interface GameDetails {
  id: number;
  name: string;
  genres?: { id: number; name: string }[];
  platforms?: { id: number; name: string }[];
  rating?: number;
  cover?: {
    id: number;
    url: string;
  };
}

const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameDetails | null>(null);

  useEffect(() => {
    const getGameDetails = async () => {
      if (id) {
        const gameData = await fetchGameDetails(id);
        setGame(gameData);
      }
    };

    getGameDetails();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      {game.cover && <img src={game.cover.url} alt={game.name} />}
      <p>Rating: {game.rating}</p>
      <p>Genres: {game.genres?.map((genre) => genre.name).join(", ")}</p>
      <p>
        Platforms: {game.platforms?.map((platform) => platform.name).join(", ")}
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GameDetailsPage;
