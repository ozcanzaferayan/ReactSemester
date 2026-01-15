import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const API_URL = 'http://localhost:3000/pokemons';

export type Pokemon = {
  id: string;
  name: string;
};

// CACHE
// =========
// pokemons = ["", ""]
export const usePokemons = () => {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemons'],
    queryFn: () => fetch(API_URL).then((res) => res.json()),
  });
};
// CACHE
// =========
// pokemons_3 = {id: 3, name: "Venusaur"}
// pokemons_2 = {id: 2, name: "Ivysaur"}
export const usePokemon = (id: string) => {
  return useQuery<Pokemon>({
    queryKey: ['pokemons', id],
    queryFn: () => fetch(API_URL + '/' + id).then((res) => res.json()),
  });
};

// POST
// =====
// {name: "Charizard"}
export const useAddPokemon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemons'] });
    },
  });
};

// PUT
// =====
// url: localhost:3000/pokemons/3
// {name: "Charizard"}
export const useUpdatePokemon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetch(API_URL + '/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemons'] });
    },
  });
};

// DELETE: http://localhost:3000/pokemons/2
export const useDeletePokemon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetch(API_URL + '/' + id, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemons'] });
    },
  });
};
