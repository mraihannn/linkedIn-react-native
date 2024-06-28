import { Text, TouchableWithoutFeedback, View } from "react-native";

export default function FollowCard({ navigation, data, mode, following }) {
  const followingIds = following.map((user) => user._id);
  const isFollowing = followingIds.includes(data._id);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Profile", { _id: data._id });
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#e9e5df",
          paddingVertical: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#e7a33e",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>
              {data.username[0].toUpperCase()}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={{ fontSize: 17, fontWeight: 500 }}>
              {data?.name || data.username}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 400 }}>
              {data.username}
            </Text>
          </View>
        </View>
        {isFollowing ? (
          <Text
            style={{
              backgroundColor: "#e9e5df",
              color: "#56687a",
              fontWeight: "bold",
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}
          >
            Followed
          </Text>
        ) : (
          <Text
            style={{
              backgroundColor: "#0a66c2",
              color: "white",
              fontWeight: "bold",
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}
          >
            Follow
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
