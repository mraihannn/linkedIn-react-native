import React from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "./HomeScreen";

export default function CreatePostScree({ navigation }) {
  const [content, setContent] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [tags, setTags] = React.useState([]);

  const handleTagsChange = (text) => {
    const tagsArray = text.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };

  const ADD_POST = gql`
    mutation AddPost($post: newPost) {
      addPost(post: $post) {
        content
        _id
        tags
        imgUrl
        authorId
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  `;

  let post = { content, imgUrl, tags };
  const [postFunction, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS, "getPosts"],
  });

  const handleSubmit = async () => {
    try {
      await postFunction({ variables: { post } });
      navigation.navigate("Home");
      setContent("");
      setImgUrl("");
      setTags("");

      // console.log(post);
    } catch (error) {
      Alert.alert(error.message);
      setContent("");
      setImgUrl("");
      setTags("");
    }
  };

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
            backgroundColor: "#0a66c2",
            color: "white",
            fontWeight: "bold",
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 7,
          }}
          onPress={handleSubmit}
        >
          Posting
        </Text>
      </View>

      <TextInput
        style={styles.input}
        multiline={true}
        onChangeText={setContent}
        value={content}
        placeholder="What do you think?"
      />

      <TextInput
        style={{ borderWidth: 1, padding: 10 }}
        onChangeText={setImgUrl}
        value={imgUrl}
        placeholder="Image Url"
      />

      <TextInput
        style={{ borderWidth: 1, padding: 10 }}
        onChangeText={handleTagsChange}
        value={tags}
        placeholder="Add some word, seperate with coma, ex: (edu,job)"
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
    borderWidth: 1,
    padding: 10,
  },
});
