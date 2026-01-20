// rnfe
import { signInWithEmail } from '@/src/features/auth/login';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const Login = () => {
  // usss
  const [email, setEmail] = useState<string>("ozcanzaferayan@gmail.com")
  const [password, setPassword] = useState<string>("passw0rd!");

  const handleLogin = async () => {
    try {
      const { user, session } = await signInWithEmail(email, password);

    } catch (error) {
      alert(error)
    }
  }
  return (
    <View>
      {/* email */}
      <TextInput value={email} onChangeText={setEmail} placeholder='Email' />
      {/* password */}
      <TextInput value={password} onChangeText={setPassword} placeholder='Password'
        secureTextEntry />
      {/* button */}
      <Button title="Login" onPress={handleLogin} />
      <Link href={"/signup"} asChild>
        <Button title="SignUp" />
      </Link>
    </View>
  )
}

export default Login