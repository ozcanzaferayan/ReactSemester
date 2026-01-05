//rnfes

import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(email + " giriş yaptı.");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="phone-pad"
        placeholder="Email adresiniz"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Parolanız"
        style={styles.input}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />

      <TextInput
        placeholder="Açıklama Giriniz"
        style={[styles.input, { height: 100 }]}
        multiline
        numberOfLines={4}
      />

      <TextInput
        placeholder="Ara"
        style={styles.input}
        returnKeyType="search"
      />

      <TextInput
        placeholder="Ara"
        style={styles.input}
        returnKeyType="search"
        autoComplete="cc-csc"
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 16,
    padding: 8,
    marginHorizontal: 16,
  },
});
