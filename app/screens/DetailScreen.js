import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CommentCard from "../components/CommentCard";
import { gql, useMutation, useQuery } from "@apollo/client";

export default function DetailPostScreen({ navigation, route }) {
  if (!route.params) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please select some post at Home Page</Text>
      </View>
    );
  }
  const [content, setContent] = React.useState("");

  const GET_POSTS_BY_ID = gql`
    query GetPostById($id: String) {
      getPostById(id: $id) {
        _id
        content
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
        DetailAuthor {
          _id
          username
        }
      }
    }
  `;

  const ADD_COMMENT = gql`
    mutation AddComment($content: String, $idPost: String) {
      addComment(content: $content, idPost: $idPost) {
        content
        username
        createdAt
        updatedAt
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS_BY_ID, {
    variables: { id: route.params._id },
  });

  const [postFunction, { loading: addCommentLoading }] = useMutation(
    ADD_COMMENT,
    {
      refetchQueries: [
        {
          query: GET_POSTS_BY_ID,
          variables: { id: route.params._id },
        },
      ],
    }
  );

  const handleSubmit = async () => {
    try {
      await postFunction({
        variables: { content, idPost: data.getPostById._id },
      });
      setContent("");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

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
              <Text style={{ fontSize: 25, color: "white" }}>
                {data?.getPostById.DetailAuthor.username[0].toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {data?.getPostById.DetailAuthor?.name ||
                  data?.getPostById.DetailAuthor.username}
              </Text>
              <Text style={{ color: "gray", fontWeight: "400" }}>
                {data?.getPostById.DetailAuthor.username}
              </Text>
            </View>
          </View>

          <Text>{data?.getPostById.content}</Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "gray" }}>
              {data?.getPostById.likes.length} Likes
            </Text>
            <Text style={{ color: "gray" }}>
              {data?.getPostById.comments.length} Comments
            </Text>
          </View>

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
            {/* <V iew style={{ alignItems: "center" }}>
              <Octicons
                style={{ transform: "scaleX(-1)" }}
                name="thumbsup"
                size={16}
                color="#38434f"
              />
              <Text>Like</Text>
            </V>
            <View style={{ alignItems: "center" }}>
              <Octicons
                style={{ transform: "scaleX(-1)" }}
                name="comment"
                size={16}
                color="#38434f"
              />
              <Text>Comment</Text>
            </View> */}
          </View>
        </View>
        <View style={{ gap: 10, flex: 1 }}>
          <Text style={{ fontSize: 25, fontWeight: "500" }}>Comment</Text>
          <FlatList
            data={data?.getPostById.comments}
            renderItem={({ item }) => <CommentCard data={item} />}
            keyExtractor={(item, i) => i}
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
              onPress={handleSubmit}
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
