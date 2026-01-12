import { View, Text, Image } from 'react-native';
import React from 'react';
import { Notification as NotificationType } from '@/data/data';

type Props = {
  notification: NotificationType;
};

const Notification = ({ notification: { id, img, isRead, text, time, user } }: Props) => {
  const className = !isRead ? 'bg-slate-200' : '';
  
  return (
    <View className={'flex-row gap-4 rounded-xl p-4 ' + className}>
      {/* Avatar */}
      <Image source={{ uri: img }} className="h-10 w-10 rounded-full" />
      {/* Texts */}
      <View className="gap-2 pr-20">
        {/* Name and text */}
        <View className="flex-row flex-wrap">
          <Text className="text-gray-500">
            <Text className="font-bold text-gray-950">{user}</Text> {text}{' '}
            {!isRead && <View className="h-2 w-2 rounded-full bg-red-500"></View>}
          </Text>
        </View>
        {/* Time */}
        <Text className="text-gray-500">{time}</Text>
      </View>
    </View>
  );
};

export default Notification;
