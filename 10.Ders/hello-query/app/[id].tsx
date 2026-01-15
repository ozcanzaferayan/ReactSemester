import { usePokemon, useUpdatePokemon } from '@/src/hooks/usePokemons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pokemon } = usePokemon(id);
  const { mutate: updatePokemon } = useUpdatePokemon();
  // usss
  const [name, setName] = useState(pokemon?.name);
  // uffs
  useEffect(() => {
    // Pokemon adı yoksa bişi yapma
    if (!pokemon?.name) {
      return;
    }
    setName(pokemon.name);
  }, [pokemon?.name]);

  const handleSave = () => {
    // save metodu
    updatePokemon({ id, name: name! });
  };

  return (
    <View>
      <Text className="text-6xl">{pokemon?.id}</Text>
      <Text className="text-6xl">{pokemon?.name}</Text>
      <TextInput value={name} onChangeText={setName} className="m-4 border p-4 text-2xl" />
      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
};

export default Detail;
