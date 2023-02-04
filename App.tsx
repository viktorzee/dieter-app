import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { signOut, currentUser } from "./core";
import SignUpScreen from "./screens/auth/SignUp";
import { StatusBar } from "react-native";
import Login from "./screens/auth/Login";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { Colors } from "./constants/Colors";
import DashboardScreen from "./screens/DashboardScreen";
import IconButton from "./components/UI/IconButton";
import AppLoading from "expo-app-loading";
import { store, useAppSelector } from "./state-management/store";
import { selectIsAuthenticated } from "./state-management/features/authSlice";
import { useSelector, Provider } from "react-redux";
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useAppDispatch } from "./state-management/hook";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DieticansScreen from "./screens/DieticansScreen";
import SpecialtiesScreen from "./screens/SpecialtiesScreen";
import ResturantsLocatorScreen from "./screens/ResturantsLocatorScreen";
import AccountScreen from "./screens/AccountScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import ForgotPassword from "./screens/auth/ForgotPassword";
import { AuthStackParamList } from "./types/nav";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthenticatedDrawer({
  navigation,
}: StackScreenProps<AuthStackParamList, "Login">) {
  async function logoutHandler() {
    try {
      await signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#351401",
        },

        headerTintColor: "white",
        sceneContainerStyle: {
          backgroundColor: "#3f2f25",
        },
        drawerContentStyle: {
          backgroundColor: Colors.primary500,
        },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: Colors.input100,
        drawerActiveBackgroundColor: Colors.textColor100,
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            icon="exit"
            size={24}
            onPress={() => logoutHandler()}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          title: "",
        }}
      />
      <Drawer.Screen name="DieticansList" component={DieticansScreen} />
      <Drawer.Screen name="SpecialtiesList" component={SpecialtiesScreen} />
      <Drawer.Screen
        name="ResturantLocator"
        component={ResturantsLocatorScreen}
      />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Contact" component={ContactUsScreen} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        cardStyle: { backgroundColor: Colors.primary500 },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={AuthenticatedDrawer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated === null && <AppLoading />}
      {isAuthenticated === false && <AuthStack />}
      {isAuthenticated === true && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Root />
      </Provider>
      <StatusBar />
    </>
  );
}
