import '../global.css';

import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999999',
      }}>
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Octicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="(tabs)/card"
        options={{
          title: 'Card',
          tabBarIcon: ({ focused, color, size }) => {
            return <Octicons name="credit-card" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="(tabs)/scan"
        options={{
          title: '',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View className="h-16 w-16 items-center justify-center rounded-full bg-purple-500 p-4">
                <Octicons name="codescan" size={size} color={'white'} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="(tabs)/stat"
        options={{
          title: 'Stat',
          tabBarIcon: ({ focused, color, size }) => {
            return <Octicons name="graph" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return <Octicons name="person" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
