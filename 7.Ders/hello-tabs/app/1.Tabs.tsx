import { Text } from 'react-native';
import '../global.css';

import { Stack, Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) return <Text>😌</Text>;
            return <Text>😄</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="(tabs)/settings"
        options={{
          title: 'Ayarlar',
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) return <Text>🚀</Text>;
            return <Text>⚙️</Text>;
          },
        }}
      />
    </Tabs>
  );
}
