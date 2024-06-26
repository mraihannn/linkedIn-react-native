import { StyleSheet, Text, View } from "react-native";

export default function CreatePostScree() {
  return (
    <View style={styles.container}>
      <Text>Create Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    paddingTop: 60,

    // paddingHorizontal: 20,
  },
});
