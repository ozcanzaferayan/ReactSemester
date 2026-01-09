import { View, Text } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View className="flex-row items-center justify-between p-4">
      {/* Notifications */}
      <View className="flex-row items-center gap-4">
        <Text className="text-2xl font-bold">Notifications</Text>
        <View className="rounded bg-blue-900 px-3 py-1">
          <Text className="font-semibold text-white">3</Text>
        </View>
      </View>
      {/* Mark All */}
      <Text className="text-gray-700">Mark all as read</Text>
    </View>
  );
};

export default Header;
