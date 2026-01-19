// rnfe

import { AuthContext } from '@/src/contexts/AuthContext';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Hata: AuthProvider kullanılmadı");
  }

  return (
    <View>
      <Text>{context.user?.name}</Text>
    </View>
  )
}

export default Index