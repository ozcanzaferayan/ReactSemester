// rnfe
import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  // uffs
  useEffect(() => {
    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(user) => user.id.toString()}
      renderItem={({ item: user }) => <Text>{user.name}</Text>}
    />
  );
};

export default Home;
