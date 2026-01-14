import { useFetch } from '@/src/hooks/useFetch';
import React from 'react';
import { Text, View } from 'react-native';

export type Pokemon = {
  id: string;
  name: string;
  sprites: {
    // Pokemon görseli
    // "https://blabla.jpg"
    front_default: string;
  };
};

type User = {
  id: string;
  name: string;
};

const Index = () => {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/3`;
  const USERS_URL = `https://jsonplaceholder.typicode.com/users`;

  const { data: pokemon } = useFetch<Pokemon>({ url: API_URL });
  const { data: users } = useFetch<User[]>({ url: USERS_URL });

  return (
    <View>
      <Text className="text-6xl">{pokemon?.name}</Text>
      {users?.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
};

export default Index;
