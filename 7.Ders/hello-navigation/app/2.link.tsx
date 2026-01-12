// rnfe

import { Button, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Link href={'/detail'} asChild>
        <Button title="Detaya Git" />
      </Link>
    </View>
  );
};

export default Index;
