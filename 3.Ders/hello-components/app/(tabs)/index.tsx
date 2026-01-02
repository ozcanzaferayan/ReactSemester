// rnfe

// Milli piyango bileti üreten buton yazınız
// 1 3 5 7 9 1 2

import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [bilet, setBilet] = useState<number[]>([]);
  const [kazanc, setKazanc] = useState(0);

  const handleTicket = () => {
    const adet = 7;
    const max = 10;
    const sayilar = [];
    const amortiler = [2, 8];
    for (let i = 0; i < adet; i++) {
      const sayi = Math.floor(Math.random() * max);
      sayilar.push(sayi);
    }

    // Amorti çıktı mı kontrol et
    if (amortiler.includes(sayilar[adet - 1])) {
      setKazanc(200);
    } else {
      setKazanc(0);
    }

    setBilet([...sayilar]);
  };

  return (
    <SafeAreaView>
      <Button title="Bilet oluştur" onPress={handleTicket} />
      <Text style={styles.sayilar}>{bilet.join(", ")}</Text>
      <Text style={styles.sayilar}>Kazancınız {kazanc} TL</Text>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  sayilar: {
    fontSize: 42,
  },
});
