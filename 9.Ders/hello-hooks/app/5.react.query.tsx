// rnfe
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';
import { Pokemon } from './4.ornek.useFetch';

// REACT QUERY CACHE
// ======
// todos: [{}, {}]
// pokemons: [{}, {}]
// user_id: {}

type PokemonsResult = {
  count: number;
  results: Pokemon[];
};

const Index = () => {
  const API_URL = 'https://pokeapi.co/api/v2/pokemon';

  const { data: pokemonsResult } = useQuery<PokemonsResult>({
    queryKey: ['pokemons'],
    queryFn: () => {
      return fetch(API_URL).then((res) => res.json());
    },
  });
  return (
    <View>
      {pokemonsResult?.results?.map((p) => (
        <Text key={p.name}>{p.name}</Text>
      ))}
    </View>
  );
};

export default Index;
