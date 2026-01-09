// rnfe
import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';

const HomePage = () => {
  // usss
  const [list, setList] = useState([
    'Doğan',
    'Paçalı',
    'Taklacı',
    'Kartal',
    'Şahin',
    'Serçe',
    'Akbaba',
    'Albatros',
    'Doğan',
    'Paçalı',
    'Taklacı',
    'Kartal',
    'Şahin',
    'Serçe',
    'Akbaba',
    'Albatros',
  ]);

  return (
    <ScrollView StickyHeaderComponent={() => <Text>Başlık</Text>}>
      {list.map((guvercin) => (
        <Text className="text-6xl" key={guvercin}>
          {guvercin}
        </Text>
      ))}
    </ScrollView>
  );
};

export default HomePage;
