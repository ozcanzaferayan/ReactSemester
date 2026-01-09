import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { notifications as data } from '@/data/data';
import Notification from '@/components/Notification';

const Home = () => {
  const [notifications, setNotifications] = useState(data);

  return (
    <SafeAreaView>
      <Header />
      <FlatList
        className=""
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-4"></View>}
        data={notifications}
        keyExtractor={(n) => n.id}
        renderItem={({ item: n }) => <Notification notification={n} />}
      />
    </SafeAreaView>
  );
};

export default Home;
