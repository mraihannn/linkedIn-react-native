import { Text, View } from "react-native";

export default function CommentCard({ data }) {
  return (
    <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
      <View
        style={{
          borderRadius: 45,
          marginTop: 10,
          width: 50,
          height: 50,
          backgroundColor: "#e7a33e",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "white" }}>
          {data.username[0].toUpperCase()}
        </Text>
      </View>
      <View style={{ flex: 1, padding: 10, backgroundColor: "#e9e5df" }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {" "}
            {data.username}
          </Text>
          <Text style={{ color: "gray", fontWeight: "400" }}>
            {" "}
            {data?.name || data.username}
          </Text>
        </View>
        <Text>{data.content}</Text>
      </View>
    </View>
  );
}
