import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const Index = () => {
  // usss
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const handleLogin = () => {
    if (!email) {
      setEmailError('Email adresi giriniz');
    }
    if (!password) {
      setPasswordError('Parola giriniz');
    }
    // Email regex. Buna sakın dokunma
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    // Minimum eight characters, at least one letter and one number:
    const regexpPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    if (email && !regexp.test(email)) {
      setEmailError('Düzgün bir email adresi giriniz');
    }
    if (password && !regexpPassword.test(password)) {
      setPasswordError('Minimum eight characters, at least one letter and one number:');
    }
    if (email && password && !emailError && !passwordError) {
      alert('Giriş başarılı');
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      {emailError && <Text className="text-red-500">{emailError}</Text>}
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      {passwordError && <Text className="text-red-500">{passwordError}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Index;
