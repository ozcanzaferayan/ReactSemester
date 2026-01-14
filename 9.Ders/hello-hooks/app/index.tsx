// rnfe
import { usePokemon, usePokemons } from '@/src/hooks/usePokemons';
import React from 'react';
import { Image, Text, View } from 'react-native';

// REACT QUERY CACHE
// ======
// todos: [{}, {}]
// pokemons: [{}, {}]
// user_id: {}

const Index = () => {
  const { data: pokemonsResult } = usePokemons();
  const { data: pokemon } = usePokemon(25);

  return (
    <View>
      <Text className="text-6xl">{pokemon?.name}</Text>
      <Image source={{ uri: pokemon?.sprites.front_default }} className="h-48 w-48" />
      {pokemonsResult?.results?.map((p) => (
        <Text key={p.name}>{p.name}</Text>
      ))}
    </View>
  );
};

export default Index;
