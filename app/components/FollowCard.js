import { Text, View } from "react-native";

export default function FollowCard() {
  return (
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
          <Text style={{ fontSize: 25, color: "white" }}>N</Text>
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={{ fontSize: 17, fontWeight: 500 }}>Fullname</Text>
          <Text style={{ fontSize: 17, fontWeight: 400 }}>Username</Text>
        </View>
      </View>
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
    </View>
  );
}
