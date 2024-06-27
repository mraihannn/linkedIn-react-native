import { gql, useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { AuthContext } from "../App";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setIsSignedIn } = useContext(AuthContext);

  const LOGIN = gql`
    mutation Login($password: String, $email: String) {
      login(password: $password, email: $email) {
        accessToken
      }
    }
  `;

  const [login, { loading }] = useMutation(LOGIN);

  const handleSubmit = async () => {
    try {
      const result = await login({ variables: { email, password } });
      await SecureStore.setItemAsync(
        "accessToken",
        result.data.login.accessToken
      );
      setIsSignedIn(true);
      console.log(result);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png",
          }}
        />
        <Text>Close</Text>
      </View>
      <View style={{ justifyContent: "center", flex: 1, gap: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Sign In</Text>
        <TextInput
          placeholder="Email"
          inputMode="email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Text onPress={() => navigation.navigate("Register")}>
          Dont have accout? Sign Up
        </Text>
        <Button
          disabled={loading}
          color={"#0a66c2"}
          title={loading ? "Submitting" : "Sign In"}
          onPress={handleSubmit}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
