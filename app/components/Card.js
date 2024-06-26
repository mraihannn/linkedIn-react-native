import { Octicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function Card() {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "white",
        // flexDirection: "row",

        gap: 10,
        // flexWrap: "wrap",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          style={{ borderRadius: 45, width: 50, height: 50 }}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <View
          style={{
            // backgroundColor: "red",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Name</Text>
          <Text style={{ color: "gray", fontWeight: "400" }}>Username</Text>
        </View>
      </View>

      <Text>loremloremloremloremloremloremloremloremloremloremlorem</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "red",
          justifyContent: "space-around",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Octicons
            style={{ transform: "scaleX(-1)" }}
            name="thumbsup"
            size={16}
            color="black"
          />
          <Text>Like</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Octicons
            style={{ transform: "scaleX(-1)" }}
            name="comment"
            size={16}
            color="black"
          />
          <Text>Comment</Text>
        </View>
      </View>
    </View>
  );
}
