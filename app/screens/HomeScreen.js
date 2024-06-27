import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../components/Card";

export default function HomeScreen({ route, navigation }) {
  // const { message } = route.params;
  const DATA = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={() => <Card />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9e5df",
    paddingTop: 60,
  },
  input: {
    height: 40,
    padding: 10,
  },
});
