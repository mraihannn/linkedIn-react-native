import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import Card from "../components/Card";
import FollowCard from "../components/FollowCard";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../App";
import { GET_USER_BY_ID } from "./ProfileScreen";

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

const ADD_LIKE = gql`
  mutation AddLike($idPost: String) {
    addLike(idPost: $idPost) {
      username
      createdAt
      updatedAt
    }
  }
`;

const SEARCH_USER = gql`
  query SearchUser($username: String) {
    searchUser(username: $username) {
      _id
      name
      username
      email
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followingDetail {
        _id
        name
        username
        email
      }
      follower {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followerDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function HomeScreen({ route, navigation }) {
  const [username, setUsername] = React.useState();
  const [id, setId] = useState("");

  useEffect(() => {
    SecureStore.getItemAsync("username").then((res) => {
      setUsername(res);
    });
    SecureStore.getItemAsync("userId").then((res) => {
      setId(res);
    });
  }, []);

  const { data: dataCurrentUser, refetch: refetchCurrentUser } = useQuery(
    GET_USER_BY_ID,
    {
      variables: { id },
    }
  );

  const { setIsSignedIn } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_POSTS);

  const [search, setSearch] = React.useState("");
  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_USER, {
    variables: { username: search },
  });

  const [likeFunction] = useMutation(ADD_LIKE, {
    // refetchQueries: [GET_POSTS],
  });

  const handleLike = async (idPost) => {
    try {
      await likeFunction({ variables: { idPost } });
      Alert.alert("Success add like");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (loading)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>{error.message}</Text>
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
          <Text style={{ fontSize: 25, color: "white" }}>
            {username && username[0]?.toUpperCase()}
          </Text>
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
          {searchLoading && <Text>Loading</Text>}
          <FlatList
            data={searchData?.searchUser}
            renderItem={({ item }) => (
              <FollowCard
                navigation={navigation}
                data={item}
                following={dataCurrentUser.getUserById.followingDetail}
                refetch={refetchCurrentUser}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      ) : (
        <FlatList
          data={data?.getPosts}
          renderItem={({ item }) => (
            <Card
              navigation={navigation}
              data={item}
              username={username}
              handleLike={handleLike}
            />
          )}
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
