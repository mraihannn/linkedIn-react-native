import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyTabs from "./navigators/TabNav";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // headerLeft: () => null,
          // headerTitle: () => (
          //   <Image
          //     style={{ width: 50, height: 50 }}
          //     source={{
          //       uri: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png",
          //     }}
          //   />
          // ),
        }}
        initialRouteName="Login"
      >
        <Stack.Screen
          options={{
            title: "Sign Up",
            // headerShown: false,
            // headerStyle: { backgroundColor: "red" },
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
