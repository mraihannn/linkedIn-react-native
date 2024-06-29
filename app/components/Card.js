import { Octicons } from "@expo/vector-icons";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Card({ navigation, data, username, handleLike }) {
  const likesUsername = data.likes.map((user) => user.username);
  const isLike = likesUsername.includes(username);

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
              backgroundColor: "#0a66c2",
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
            <Text style={{ color: "gray", fontWeight: "400" }}>Full Name</Text>
          </View>
        </View>

        <Text>{data.content}</Text>

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
          <TouchableWithoutFeedback onPress={() => handleLike(data._id)}>
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
