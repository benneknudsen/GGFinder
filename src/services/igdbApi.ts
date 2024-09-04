import axios from "axios";
import { GameDetails } from "../types/Game";

// Fetch the Client ID and Secret from environment variables
const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

export const fetchAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to fetch access token");
  }
};

export const fetchGames = async (query: string): Promise<GameDetails[]> => {
  const token = await fetchAccessToken();

  try {
    const response = await axios.post<GameDetails[]>(
      `/api/games`,
      `search "${query}"; fields id,name,genres.name,platforms.name,rating,cover.url;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Failed to fetch games");
  }
};

export const fetchGameDetails = async (id: string): Promise<GameDetails> => {
  const token = await fetchAccessToken();

  try {
    const response = await axios.post<GameDetails[]>(
      `/api/games`,
      `fields id,name,genres.name,platforms.name,rating,cover.url; where id = ${id};`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw new Error("Failed to fetch game details");
  }
};
