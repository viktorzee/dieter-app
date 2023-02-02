import { Alert } from "react-native";
import React, { useState } from "react";
import { authClient } from "../core";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { StackNavigationProps } from "../types/nav";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProps>();

  async function signUpWithEmail(email: string, password: string) {
    setIsLoading(true);
    const { error } = await authClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    Alert.alert("Success", "Your account was created");
    navigation.navigate("Login");
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message="Please wait, Signing you up" />;
  }
  return <AuthContent isLogin={false} onAuthenticate={signUpWithEmail} />;
};

export default SignUpScreen;
