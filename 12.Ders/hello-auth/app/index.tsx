// rnfe

import { useAuth } from '@/src/contexts/AuthContext';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

const Index = () => {
  const { auth } = useAuth();

  // uffs
  useEffect(() => {
    return () => {
      console.log("Oldü")
    }
  }, [])


  if (auth.isLoading) {
    return <Text>Splash screen</Text>
  }

  if (auth.session) {
    return <Redirect href={"/hello"} />
  } else {
    return <Redirect href={"/login"} />
  }
}

export default Index