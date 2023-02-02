import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { signOut, currentUser } from "./core";
import SignUpScreen from "./screens/SignUpScreen";
import { StatusBar } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "./constants/Colors";
import DashboardScreen from "./screens/DashboardScreen";
import IconButton from "./components/UI/IconButton";
import AppLoading from "expo-app-loading";
import { store, useAppSelector } from "./state-management/store";
import { selectIsAuthenticated } from "./state-management/features/authSlice";
import { useSelector, Provider } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProps, StackParamList } from "./types/nav";
import { useAppDispatch } from "./state-management/hook";

const Stack = createStackNavigator<StackParamList>();

function AuthStack() {
  const navigation = useNavigation<StackNavigationProps>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const navigation = useNavigation<StackNavigationProps>();

  async function submitHandler() {
    try {
      signOut();
      console.log("first");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        cardStyle: { backgroundColor: Colors.primary500 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              color={tintColor}
              icon="exit"
              size={24}
              onPress={submitHandler}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <AppLoading />;
  }
  return <Navigation />;
}

function Navigation() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
