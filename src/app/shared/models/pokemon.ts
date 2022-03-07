export interface Pokemon {
  abilities: {
    description: string;
    name: string;
  }[];
  evolutionId: number;
  id: number;
  image: string;
  lvl: string;
  name: string;
  type: string[];
}
