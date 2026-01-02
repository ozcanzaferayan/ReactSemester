// rnfe
// Multiple find: CMD + D / Ctrl + D
import Button from "@/components/button";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView>
      <Button title="Tıkla" />
      <Button title="Tıkla" type="primary" />
      <Button title="Tıkla" type="secondary" />
      <Button title="Tıkla" type="success" />
    </SafeAreaView>
  );
};

export default Index;
