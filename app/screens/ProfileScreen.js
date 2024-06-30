import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FollowCard from "../components/FollowCard";
import { gql, useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String) {
    getUserById(id: $id) {
      _id
      name
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      email
      username
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

export default function ProfileScreen({ navigation, route }) {
  const [id, setId] = useState("");
  const [toggleFollowing, setToggleFollowing] = useState(false);

  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
    refetch: refetchCurrentUser,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });

  const {
    loading: loadingOtherUser,
    error: errorOtherUser,
    data: dataOtherUser,
    refetch: refetchOtherUser,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: route.params?._id },
    skip: !route.params,
  });

  useEffect(() => {
    SecureStore.getItemAsync("userId").then((res) => {
      setId(res);
    });
  }, []);

  const loading = loadingCurrentUser || loadingOtherUser;
  const error = errorCurrentUser || errorOtherUser;
  const data = dataOtherUser || dataCurrentUser;

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
        <Text style={{ fontSize: 70, color: "white" }}>
          {data.getUserById.username[0].toUpperCase()}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>
          {data.getUserById?.name || data.getUserById.username}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          {data.getUserById.username}
        </Text>
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
          <Text
            onPress={() => setToggleFollowing(false)}
            style={styles.textFollower}
          >
            {data.getUserById.follower?.length || 0} Followers
          </Text>
          <Text
            onPress={() => setToggleFollowing(true)}
            style={styles.textFollower}
          >
            {data.getUserById.following?.length || 0} Following
          </Text>
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
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500" }}>
          {toggleFollowing ? "Following" : "Followers"}
        </Text>
        <FlatList
          data={
            toggleFollowing
              ? data.getUserById.followingDetail
              : data.getUserById.followerDetail
          }
          renderItem={({ item }) => (
            <FollowCard
              refetch={route.params ? refetchOtherUser : refetchCurrentUser}
              navigation={navigation}
              data={item}
              mode={toggleFollowing ? "following" : ""}
              following={dataCurrentUser.getUserById.followingDetail}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
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
