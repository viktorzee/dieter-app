import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { authClient, authenticate } from "../core";
import { RouteProp, useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { StackNavigationProps, StackParamList } from "../types/nav";
import { useAppDispatch, useAppSelector } from "../state-management/hook";
import {
  login,
  logout,
  selectIsAuthenticated,
} from "../state-management/features/authSlice";

interface Props {
  navigation: StackNavigationProps;
  route: RouteProp<StackParamList, "Login">;
}

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProps>();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [isAuthenticated, navigation]);

  async function signInWithEmail(
    email: string,
    password: string,
    rememberMe: any
  ) {
    setIsLoading(true);
    try {
      const token = await authenticate(email, password);
      dispatch(login(token));
      setIsLoading(false);
    } catch (error: any) {
      Alert.alert(error);
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Please wait, Logging you in" />;
  }
  return <AuthContent isLogin onAuthenticate={signInWithEmail} />;
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
