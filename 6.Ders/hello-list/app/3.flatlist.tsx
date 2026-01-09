import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';

const Home = () => {
  // usss
  const [guvercinler, setGuvercinler] = useState([
    {
      id: '1',
      name: 'Paçalı',
    },
    {
      id: '2',
      name: 'Taklacı',
    },
  ]);
  return (
    <FlatList
      data={guvercinler}
      keyExtractor={(guvercin) => guvercin.id}
      renderItem={({ item: guvercin }) =>
        <Text className="text-6xl">{guvercin.name}</Text>}
    />
  );
};

export default Home;
