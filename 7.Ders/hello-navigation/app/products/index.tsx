import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Products = () => {
  return (
    <View>
      <Link href={'/products/42'}>Ürün detayına git</Link>
    </View>
  );
};

export default Products;
