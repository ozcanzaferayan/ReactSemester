import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

type Pokemon = {
  id: string;
  name: string;
};

const Index = () => {
  const pokemonId = 25;
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  // usss
  const [pokemon, setPokemon] = useState<Pokemon>();

  // uffs
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setPokemon);
  }, []);

  return (
    <View>
      <Text className="text-6xl">{pokemon?.name}</Text>
    </View>
  );
};

export default Index;
