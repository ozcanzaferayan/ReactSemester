import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [sayi, setSayi] = useState(42);
  //uffs
  useEffect(() => {
    const timerId = setInterval(() => {
      setSayi((prev) => {
        const s = prev + 1;
        console.log(s);
        return s;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View>
      <Text className="text-6xl">{sayi}</Text>
    </View>
  );
};

export default Home;
