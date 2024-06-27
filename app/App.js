import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ApolloProvider, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import client from "./config/apollo";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyTabs from "./navigators/TabNav";
import { createContext } from "react";
import { Image, View } from "react-native";

export const AuthContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("accessToken")
      .then((token) => {
        if (token) setIsSignedIn(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png",
          }}
        />
      </View>
    );

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
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
            {isSignedIn ? (
              <Stack.Screen name="Main" component={MyTabs} />
            ) : (
              <>
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
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
