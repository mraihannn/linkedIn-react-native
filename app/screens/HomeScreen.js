import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ route, navigation }) {
  // const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {/* <Text>{message}</Text> */}
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});
