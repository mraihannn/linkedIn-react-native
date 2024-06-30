import { Octicons } from "@expo/vector-icons";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function Card({ navigation, data, username, handleLike }) {
  const likesUsername = data.likes.map((user) => user.username);
  const [isLike, setIsLike] = useState(likesUsername.includes(username));

  const handleLikeClick = (postId) => {
    handleLike(postId);
    setIsLike(true);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Detail", { _id: data._id })}
    >
      <View
        style={{
          padding: 16,
          backgroundColor: "white",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              borderRadius: 45,
              width: 50,
              height: 50,
              backgroundColor: "#e7a33e",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>
              {data.DetailAuthor.username[0].toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              {data.DetailAuthor.username}
            </Text>
            <Text style={{ color: "gray", fontWeight: "400" }}>
              {data.DetailAuthor.name || data.DetailAuthor.username}
            </Text>
          </View>
        </View>

        <Text>{data.content}</Text>

        <View style={{ flexDirection: "row", gap: 5 }}>
          {data.tags &&
            data.tags.map(
              (tag) => tag && <Text style={{ color: "#0a66c2" }}>#{tag}</Text>
            )}
        </View>

        {data.imgUrl && (
          <Image
            style={{ width: "100%", height: 300 }}
            source={{
              uri: `${data.imgUrl}`,
            }}
          />
        )}

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
          <TouchableWithoutFeedback onPress={() => handleLikeClick(data._id)}>
            {isLike ? (
              <View style={{ alignItems: "center" }}>
                <AntDesign
                  style={{ transform: "scaleX(-1)" }}
                  name="like1"
                  size={16}
                  color="#38434f"
                />
                <Text>Like</Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <AntDesign
                  style={{ transform: "scaleX(-1)" }}
                  name="like2"
                  size={16}
                  color="#38434f"
                />
                <Text>Like</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
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
    </TouchableWithoutFeedback>
  );
}
