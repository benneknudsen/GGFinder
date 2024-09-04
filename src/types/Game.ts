export interface GameDetails {
  id: number;
  name: string;
  genres?: { id: number; name: string }[]; // Assuming genres is an array of objects with id and name
  platforms?: { id: number; name: string }[]; // Assuming platforms is an array of objects with id and name
  rating?: number;
  cover?: {
    id: number;
    url: string;
  };
}
