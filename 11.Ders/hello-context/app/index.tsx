// rnfe

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "black" : "white" }}>
      <Button title='Tema değiştir' onPress={toggleTheme} />
      <Text>Theme: {theme}</Text>
    </View>
  )
}

export default Index