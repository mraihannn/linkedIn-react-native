import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FollowCard from "../components/FollowCard";

export default function ProfileScreen({ navigation }) {
  const DATA = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#56687a", height: 120 }}></View>
      <View
        style={{
          width: 120,
          height: 120,
          marginTop: -60,
          marginLeft: 20,
          borderWidth: 5,
          borderColor: "white",
          backgroundColor: "#0a66c2",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 70, color: "white" }}>U</Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Fullname</Text>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Username</Text>
        {/* <Text style={{ fontSize: 20, color: "blue", fontWeight: "400" }}>
          name@gmail.com
        </Text> */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textFollower}>70 Followers</Text>
          <Text style={styles.textFollower}>10 Following</Text>
        </View>
      </View>

      {/* Followers */}
      <View
        style={{
          paddingTop: 25,
          paddingHorizontal: 20,
          borderTopWidth: 10,
          borderColor: "#e9e5df",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500" }}>Followers</Text>
        <FlatList
          data={DATA}
          renderItem={() => <FollowCard />}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 40,
  },
  textFollower: {
    color: "#004182",
    fontSize: 20,
    fontWeight: "500",
  },
});
