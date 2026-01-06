import React from 'react';
import { Image, Text, View } from 'react-native';

const Index = () => {
  return (
    <View className="flex-1 bg-blue-100">
      <View className="flex-1 items-center justify-center ">
        {/* Card Component */}
        <View className="w-64 rounded-xl bg-white p-4 shadow-md shadow-gray-300">
          {/* QR Container */}
          <View className="items-center justify-center rounded-xl bg-blue-500 p-8">
            <Image source={require('../assets/qr.png')} className="h-36 w-36" />
          </View>
          {/* Text List */}
          <Text className="mt-4 text-center text-lg font-semibold">
            Improve your front-end skills by building projects
          </Text>
          <Text className="text-md mb-4 mt-2 text-center text-gray-600">
            Scan the QR code to visit Youtube and take your coding skills to the next level
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
