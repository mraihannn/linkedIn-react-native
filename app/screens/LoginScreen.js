import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, Text, View, TextInput, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
          color={"#0a66c2"}
          title="Sign In"
          onPress={() =>
            navigation.navigate("Main", { message: "Data from Login" })
          }
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
