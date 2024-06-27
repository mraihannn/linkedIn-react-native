import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import CommentCard from "../components/CommentCard";

export default function DetailPostScreen({ navigation }) {
  const [content, setContent] = React.useState("");
  const DATA = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#e9e5df",
          paddingVertical: 10,
        }}
      >
        <Text onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </Text>
      </View>

      <View
        style={{
          paddingTop: 10,
          // backgroundColor: "yellow",
          flex: 1,
        }}
      >
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
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
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Username</Text>
              <Text style={{ color: "gray", fontWeight: "400" }}>
                Full Name
              </Text>
            </View>
          </View>

          <Text>loremloremloremloremloremloremloremloremloremloremlorem</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // backgroundColor: "red",
              borderTopColor: "#e9e5df",
              borderTopWidth: 1,
              paddingTop: 10,
              justifyContent: "space-around",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Octicons
                style={{ transform: "scaleX(-1)" }}
                name="thumbsup"
                size={16}
                color="#38434f"
              />
              <Text>Like</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Octicons
                style={{ transform: "scaleX(-1)" }}
                name="comment"
                size={16}
                color="#38434f"
              />
              <Text>Comment</Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 10, flex: 1 }}>
          <Text style={{ fontSize: 25, fontWeight: "500" }}>Comment</Text>
          <FlatList
            data={DATA}
            renderItem={() => <CommentCard />}
            keyExtractor={(item) => item}
          />
        </View>
        <View
          style={{
            // backgroundColor: "blue",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
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
            onChangeText={setContent}
            value={content}
            placeholder="What is your opinion?"
          />
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                paddingHorizontal: 5,
                color: "#0a66c2",
              }}
            >
              Posting
            </Text>
          </View>
        </View>
      </View>
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
    // height: 40,
    // borderWidth: 1,
    padding: 10,
  },
});
