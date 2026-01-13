import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Transaction = {
  id: string;
  brand: 'youtube' | 'stripe' | 'google-play';
  detail: string;
  isRevenue: boolean;
  price: string;
  date: string;
};

const Index = () => {
  // usss
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      brand: 'youtube',
      detail: 'Subscription',
      isRevenue: false,
      price: '$15,00',
      date: '16 May 2024',
    },
    {
      id: '2',
      brand: 'stripe',
      detail: 'Subscription',
      isRevenue: true,
      price: '$640,00',
      date: '12 May 2024',
    },
    {
      id: '3',
      brand: 'google-play',
      detail: 'Subscription',
      isRevenue: false,
      price: '$30,00',
      date: '23 May 2024',
    },
  ]);
  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      {/* Buraya image gelecek kardeş */}
      <View className="absolute h-64 w-full bg-purple-950" />

      <SafeAreaView className="p-8">
        {/* HEADER */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            {/* Image */}
            <View className="h-12 w-12 rounded-full bg-gray-400" />
            {/* TextContainer */}
            <View>
              <Text className="text-xl font-semibold text-white">Hello Hilya</Text>
              <Text className="text-base text-gray-300">Welcome back</Text>
            </View>
          </View>
          {/* BellIcon */}
          <View>
            <Octicons name="bell" size={20} color={'white'} />;
          </View>
        </View>
        {/* CARD */}
        <View className="mt-8 gap-2 rounded-xl bg-white p-4 shadow shadow-gray-200">
          {/* YOUR BALANCE */}
          <Text className="text-gray-500">YOUR BALANCE</Text>
          {/* $9999 eyeicon */}
          <View className="flex-row items-center gap-4">
            <Text className="text-4xl font-semibold  text-black">
              $<Text className="text-4xl"> 41,379,00</Text>
            </Text>
            <Octicons name="eye" color={'#999999'} size={18} />
          </View>
          {/* Transfer, Withdraw, Invest, Top up */}
          {/* arrow-up arrow-down ruby credit-card */}
          <View className="mt-4 flex-row justify-around">
            {/* Transfer */}
            <View className="items-center gap-1 self-center">
              <View className="rounded-full bg-purple-800 p-4">
                <Octicons name="arrow-up" color={'white'} size={18} />
              </View>
              <Text>Transfer</Text>
            </View>
            {/* Withdraw */}
            <View className="items-center gap-1 self-center">
              <View className="rounded-full bg-purple-800 p-4">
                <Octicons name="arrow-down" color={'white'} size={18} />
              </View>
              <Text>Withdraw</Text>
            </View>
            {/* Invest */}
            <View className="items-center gap-1 self-center">
              <View className="rounded-full bg-purple-800 p-4">
                <Octicons name="ruby" color={'white'} size={18} />
              </View>
              <Text>Invest</Text>
            </View>
            {/* Top up */}
            <View className="items-center gap-1 self-center">
              <View className="rounded-full bg-purple-800 p-4">
                <Octicons name="plus" color={'white'} size={18} />
              </View>
              <Text>Top up</Text>
            </View>
          </View>
        </View>
        {/* TODO: FINANCIAL INSIGHT CARD */}

        {/* Recent Transactions */}
        <FlatList
          data={transactions}
          keyExtractor={(t) => t.id}
          className="mt-4"
          ItemSeparatorComponent={() => <View className="h-4 w-full" />}
          renderItem={({ item: tr }) => (
            <View className="flex-row items-center justify-between rounded-xl bg-white p-4 shadow shadow-gray-200">
              <View className="flex-row items-center gap-4">
                {/* Icon */}
                <View className="rounded-full bg-gray-200 p-4">
                  <FontAwesome6 name={tr.brand} size={24} color="black" />
                </View>
                {/* Text Container */}
                <View className="gap-1">
                  <Text className="text-base font-semibold text-gray-500">{tr.brand}</Text>
                  <Text className="font-base text-sm text-gray-500">{tr.detail}</Text>
                </View>
              </View>
              {/* Price Container */}
              <View>
                <Text className="text-right text-lg font-semibold text-gray-900">{tr.price}</Text>
                <Text className="font-base text-right text-sm text-gray-500">{tr.date}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default Index;
