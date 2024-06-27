import { Text, View } from "react-native";

export default function CommentCard() {
  return (
    <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
      <View
        style={{
          borderRadius: 45,
          marginTop: 10,
          width: 50,
          height: 50,
          backgroundColor: "#0a66c2",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "white" }}>N</Text>
      </View>
      <View style={{ flex: 1, padding: 10, backgroundColor: "#e9e5df" }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Username</Text>
          <Text style={{ color: "gray", fontWeight: "400" }}>Full Name</Text>
        </View>
        <Text>loremloremloremloremloremloremloremloremloremloremlorem</Text>
      </View>
    </View>
  );
}
