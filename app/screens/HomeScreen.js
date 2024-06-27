import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import Card from "../components/Card";
import FollowCard from "../components/FollowCard";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../App";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      comments {
        content
        username
        createdAt
        updatedAt
      }
      authorId
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      DetailAuthor {
        _id
        username
      }
    }
  }
`;

export default function HomeScreen({ route, navigation }) {
  // const { message } = route.params;

  const { setIsSignedIn } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_POSTS);

  const [search, setSearch] = React.useState("");
  const DATA = [1, 2, 3, 4, 5, 6, 7];

  if (loading)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text>{error.message}</Text>
      </View>
    );

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
        <Text
          onPress={async () => {
            await SecureStore.deleteItemAsync("accessToken");
            setIsSignedIn(false);
          }}
          style={{
            fontWeight: "bold",
            fontSize: 15,
            paddingHorizontal: 5,
            color: "#0a66c2",
          }}
        >
          Logout
        </Text>
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
          data={data?.getPosts}
          renderItem={({ item }) => <Card data={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
      <StatusBar style="auto" />
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
