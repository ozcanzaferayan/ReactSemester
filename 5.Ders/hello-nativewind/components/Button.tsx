// rnfe
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
};

const Button = ({ title, variant }: Props) => {
  let className = 'm-4 rounded-xl bg-blue-500 p-4';
  switch (variant) {
    case 'primary':
      className = 'm-4 rounded-xl bg-blue-500 p-4';
      break;
    case 'secondary':
      className = 'm-4 rounded-xl bg-gray-500 p-4';
      break;
    case 'danger':
      className = 'm-4 rounded-xl bg-red-500 p-4';
      break;
    case 'success':
      className = 'm-4 rounded-xl bg-green-500 p-4';
      break;
  }

  return (
    <TouchableOpacity className={className}>
      <Text className="text-center text-2xl text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
