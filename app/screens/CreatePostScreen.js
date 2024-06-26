import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreatePostScree({ navigation }) {
  const [content, setContent] = React.useState("");

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text onPress={() => navigation.navigate("Home")}>
          <Ionicons name="close-outline" size={24} color="black" />
        </Text>
        <Text
          style={{
            backgroundColor: "blue",
            color: "white",
            fontWeight: "bold",
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 7,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          Posting
        </Text>
      </View>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={10}
        onChangeText={setContent}
        value={content}
        placeholder="What do you think?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  input: {
    textAlignVertical: "top",
    flex: 1,
    height: 40,
    // borderWidth: 1,
    padding: 10,
  },
});
