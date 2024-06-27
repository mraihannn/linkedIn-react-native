import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../components/Card";
import FollowCard from "../components/FollowCard";

export default function HomeScreen({ route, navigation }) {
  // const { message } = route.params;
  const [search, setSearch] = React.useState("");
  const DATA = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
          paddingHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            borderRadius: 45,
            width: 50,
            height: 50,
            backgroundColor: "#0a66c2",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>N</Text>
        </View>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={setSearch}
          value={search}
          placeholder="Search User"
        />
      </View>
      {search.length > 0 ? (
        <View
          style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}
        >
          <FlatList
            data={DATA}
            renderItem={() => <FollowCard />}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      ) : (
        <FlatList
          data={DATA}
          renderItem={() => <Card />}
          keyExtractor={(item) => item.toString()}
        />
      )}
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
    textAlignVertical: "center",
    flex: 1,
    // height: 40,
    // borderWidth: 1,
    padding: 10,
  },
});
