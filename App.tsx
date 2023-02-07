import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { useSelector, Provider } from "react-redux";
import { Alert, StatusBar } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Session } from "@supabase/supabase-js";
import AppLoading from "expo-app-loading";

import Login from "./screens/auth/Login";
import SignUpScreen from "./screens/auth/SignUp";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Account from "./screens/Account";
import ContactUs from "./screens/Contactus";
import Dashboard from "./screens/Dashboard";
import Dieticans from "./screens/Dieticans";
import Specialties from "./screens/Specialties";
import ResturantsLocator from "./screens/ResturantsLocator";

import { selectIsAuthenticated } from "./state-management/features/authSlice";
import { signOut, authClient } from "./core";
import { AuthStackParamList } from "./types/nav";
import { Colors } from "./constants/Colors";
import { store } from "./state-management/store";
import HeaderRight from "./components/HeaderRightImage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthenticatedDrawer({
  navigation,
}: StackScreenProps<AuthStackParamList, "Login">) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch userImage from Supabase
    async function getAvatar() {
      try {
        let { data, error, status } = await authClient
          .from("profiles")
          .select("avatar_url")
          .eq("id", session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUserImage(data.avatar_url);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getAvatar();
  }, []);

  // async function logoutHandler() {
  //   try {
  //     await signOut();
  //     navigation.navigate("Login");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#351401",
        },

        // headerTintColor: "black",
        sceneContainerStyle: {
          backgroundColor: "#3f2f25",
        },
        drawerContentStyle: {
          backgroundColor: Colors.offWhite,
        },
        drawerInactiveTintColor: "black",
        drawerActiveTintColor: Colors.input100,
        drawerActiveBackgroundColor: Colors.primary500,
        headerRight: () => <HeaderRight userImage={userImage} />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          title: "Dashboard",
          headerTitle: "",
        }}
      />
      <Drawer.Screen name="DieticansList" component={Dieticans} />
      <Drawer.Screen name="SpecialtiesList" component={Specialties} />
      <Drawer.Screen name="ResturantLocator" component={ResturantsLocator} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Contact" component={ContactUs} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerShown: false,
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
