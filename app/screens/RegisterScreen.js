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
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Sign Up</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={name}
          value={setName}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={username}
          value={setUsername}
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
          // color={"red"}
          title="Sign Up"
          onPress={() => Alert.alert("Simple Button pressed")}
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
