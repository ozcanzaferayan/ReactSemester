import { useAddPokemon, useDeletePokemon, usePokemons } from '@/src/hooks/usePokemons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Index = () => {
  const { data: pokemons } = usePokemons();
  const { mutate: addPokemon } = useAddPokemon();
  const { mutate: deletePokemon } = useDeletePokemon();
  // usss
  const [name, setName] = useState('');

  const handleAdd = () => {
    addPokemon(name);
  };

  const handleDelete = (id: string) => {
    deletePokemon(id);
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} className="m-4 border p-4" />
      <Button title="Pokemon ekle" onPress={handleAdd} />
      <FlatList
        data={pokemons}
        keyExtractor={({ id }) => id}
        renderItem={({ item: p }) => (
          <View className="flex-row">
            {/* Pokemon Adı */}
            <Link href={`/${p.id}`}>
              <Text className="text-6xl">{p.name}</Text>
            </Link>
            {/* Silme butonu */}
            <TouchableOpacity onPress={() => handleDelete(p.id)}>
              <Text className="text-6xl">🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Index;
