// rnfe
import { Text, View } from 'react-native';
import React, { useState } from 'react';

const HomePage = () => {
  // usss
  const [list, setList] = useState(['Doğan', 'Paçalı', 'Taklacı']);

  return (
    <View>
      {list.map((guvercin) => (
        <Text className="text-6xl" key={guvercin}>
          {guvercin}
        </Text>
      ))}
    </View>
  );
};

export default HomePage;
