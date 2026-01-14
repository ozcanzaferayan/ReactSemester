// rnfe

import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Index = () => {
  // Business Logic (Iş Katmanı)
  // Sabit değerler
  const baslangicDeger = 0;
  // usss
  const [sayi, setSayi] = useState(baslangicDeger);

  // Metotlar
  const handleArttir = () => {
    setSayi(sayi + 1);
  };
  const handleAzalt = () => {
    setSayi(sayi - 1);
  };
  const handleReset = () => {
    setSayi(baslangicDeger);
  };

  // Arayüz
  return (
    <View>
      <Button title="Arttır" onPress={handleArttir} />
      <Button title="Azalt" onPress={handleAzalt} />
      <Button title="Reset" onPress={handleReset} />
      <Text className="text-6xl">{sayi}</Text>
    </View>
  );
};

export default Index;
