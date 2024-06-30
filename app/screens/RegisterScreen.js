import { gql, useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");

  const REGISTER = gql`
    mutation Register($user: newUser) {
      register(user: $user) {
        _id
        name
        username
        email
      }
    }
  `;

  const user = {
    email,
    password,
    username,
    name,
  };

  const [register, { loading }] = useMutation(REGISTER);

  const handleSubmit = async () => {
    try {
      await register({ variables: { user } });
      Alert.alert("Success Create Account");
      navigation.navigate("Login");
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
      </View>
      <View style={{ justifyContent: "center", flex: 1, gap: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Sign Up</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />
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
        <Text onPress={() => navigation.navigate("Login")}>
          Already have accout? Sign In
        </Text>
        <Button
          color={"#0a66c2"}
          title={loading ? "Submitting" : "Sign Up"}
          onPress={handleSubmit}
          disabled={loading}
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
