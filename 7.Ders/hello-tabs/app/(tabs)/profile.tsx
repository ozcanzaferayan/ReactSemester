import { View, Text, Image } from 'react-native';
import React from 'react';

const Profile = () => {
  const url =
    'https://images.unsplash.com/photo-1582137808224-de22c65933c0?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return <Image source={{ uri: url }} className="h-full w-full flex-1" />;
};

export default Profile;
