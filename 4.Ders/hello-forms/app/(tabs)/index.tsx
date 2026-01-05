import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bg: "#F3F3F7",
  sendBg: "#FCDBD4",
  primary: "#E62A50",
};

const Index = () => {
  // usss
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Send Icon */}
      <View style={styles.sendBg}>
        <Feather name="send" size={24} color={colors.primary} />
      </View>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.description}>Please enter the code</Text>
      <View style={styles.emailContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={"#999"}
          style={styles.email}
        />
        <Feather name="user" size={24} color="#666" style={styles.emailIcon} />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          returnKeyType="done"
          placeholderTextColor={"#999"}
          style={styles.password}
        />
        <Feather
          name="lock"
          size={24}
          color="#666"
          style={styles.passwordIcon}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={styles.eyeIcon}
        >
          <Feather
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.forgot}>Forgot Password?</Text>
      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.txtLogin}>Sign In</Text>
      </TouchableOpacity>
      {/* Or Container */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text>or</Text>
        <View style={styles.orLine} />
      </View>
      {/* Sign In Google */}
      <TouchableOpacity style={styles.socialBtnContainer}>
        <FontAwesome5 name="google" size={24} color="tomato" />
        <Text style={styles.socialBtnText}>Sign in with Google</Text>
      </TouchableOpacity>
      {/* Sign In Google */}
      <TouchableOpacity style={styles.socialBtnContainer}>
        <FontAwesome5 name="facebook" size={24} color="dodgerblue" />
        <Text style={styles.socialBtnText}>Sign in with Facebook</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  sendBg: {
    backgroundColor: colors.sendBg,
    width: 84,
    height: 84,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 36,
  },
  title: {
    fontSize: 44,
    alignSelf: "center",
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    alignSelf: "center",
    marginTop: 8,
    color: "#666",
  },
  emailContainer: {
    backgroundColor: "white",
    padding: 16,
    paddingLeft: 24,
    marginHorizontal: 32,
    marginTop: 16,
    borderRadius: 32,
  },
  email: {
    marginLeft: 28,
  },
  emailIcon: {
    position: "absolute",
    top: 10,
    left: 16,
  },
  passwordContainer: {
    backgroundColor: "white",
    padding: 16,
    paddingLeft: 24,
    marginHorizontal: 32,
    marginTop: 16,
    borderRadius: 32,
  },
  password: {
    marginLeft: 28,
  },
  passwordIcon: {
    position: "absolute",
    top: 10,
    left: 16,
  },
  eyeIcon: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  forgot: {
    marginTop: 12,
    textAlign: "right",
    marginRight: 40,
    color: "#666",
  },
  btnLogin: {
    backgroundColor: colors.primary,
    padding: 16,
    marginHorizontal: 32,
    borderRadius: 32,
    marginTop: 32,
    // Shadow
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtLogin: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  orContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginHorizontal: 32,
    alignItems: "center",
  },
  orLine: {
    flex: 1,
    backgroundColor: "#ccc",
    height: 1,
    marginHorizontal: 16,
  },
  socialBtnContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    borderColor: "#666",
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 32,
    marginTop: 16,
    borderRadius: 32,
    justifyContent: "center",
  },
  socialBtnText: {
    fontSize: 16,
  },
});
