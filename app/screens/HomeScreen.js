import { StatusBar } from "expo-status-bar";
import React from "react";

import { Button, Image, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";

export default function HomeScreen({ route, navigation }) {
  // const { message } = route.params;
  return (
    <View style={styles.container}>
      <Card />
      <Card />
      <Card />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    paddingTop: 60,
    gap: 10,
    // paddingHorizontal: 20,
  },
  input: {
    height: 40,
    // borderWidth: 1,
    padding: 10,
  },
});
