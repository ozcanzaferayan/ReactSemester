import { Pokemon } from '@/app/4.ornek.useFetch';
import { useQuery } from '@tanstack/react-query';

export type PokemonsResult = {
  count: number;
  results: Pokemon[];
};
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const usePokemons = () => {
  return useQuery<PokemonsResult>({
    queryKey: ['pokemons'],
    queryFn: () => {
      return fetch(API_URL).then((res) => res.json());
    },
  });
};
// CACHE
// =====
// pokemon_25: {"Pikachu"}
// pokemon_6: {"Blastoise"}
export const usePokemon = (id: number) => {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', id],
    queryFn: () => {
      return fetch(API_URL + '/' + id).then((res) => res.json());
    },
  });
};
