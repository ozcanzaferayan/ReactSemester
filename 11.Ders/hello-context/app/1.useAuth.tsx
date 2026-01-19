// rnfe

import useAuth from '@/src/contexts/AuthContext';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Index = () => {
  const { user, login, isLoggedIn } = useAuth();

  return (
    <View>
      <Button title='Giriş Yap' onPress={() => {
        login({
          id: "1",
          name: "Zafer",
          email: "zafer@gmail"
        })
      }} />
      <Text>{isLoggedIn ? "Giriş yapıldı" : "Çıkış yapıldı"}</Text>
      <Text>{user?.name}</Text>
    </View>
  )
}

export default Index