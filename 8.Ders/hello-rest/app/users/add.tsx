import { API_URL } from '@/src/constants/constants';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const AddUser = () => {
  const [name, setName] = useState('');

  const handleSave = () => {
    const url = API_URL + '/users';
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    }).then(() => {
      router.dismiss();
    });
  };

  return (
    <View>
      <TextInput
        className="border p-4 text-2xl"
        placeholder="Enter a name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddUser;
