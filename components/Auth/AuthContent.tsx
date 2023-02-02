import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import FlatButton from "../UI/FlatButton";
import { Colors } from "../../constants/Colors";
import { StackNavigationProps } from "../../types/nav";
import { TextInput } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import Checkbox from "../UI/Checkbox";
import IconButton from "../UI/IconButton";
import { useAppDispatch } from "../../state-management/hook";
import { login } from "../../state-management/features/authSlice";
import { signInWithFacebook } from "../../core";

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: any;
}

const AuthContent = ({ isLogin, onAuthenticate }: AuthContentProps) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    cemail: false,
    password: false,
    cpassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<StackNavigationProps>();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("SignUp");
    } else {
      navigation.navigate("Login");
    }
  }

  function submitHandler(credentials: any) {
    let { email, cemail, password, cpassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === cemail;
    const passwordsAreEqual = password === cpassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        cemail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        cpassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate(email, password);
  }

  async function signInWithFb() {
    setIsLoading(true);
    try {
      const token = await signInWithFacebook();
      console.log(token);
      dispatch(login(token));
      setIsLoading(false);
    } catch (error: any) {
      Alert.alert(error);
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.authContent}>
      {isLogin && (
        <View style={styles.loginText}>
          <Image
            source={require("../../assets/welcomesline.png")}
            style={styles.image}
          />
          <Text style={styles.welcomeBack}>Welcome back!</Text>
          <Text style={styles.login}>Login to your existing account</Text>
        </View>
      )}
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {isLogin && (
        <View style={styles.rememberMe}>
          <Checkbox
            label="Remember me"
            onValueChange={(value) => console.log(value)}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.iconContainer}>
        <IconButton
          color="blue"
          icon="logo-facebook"
          size={24}
          style={styles.icon}
          onPress={signInWithFb}
        />
        <IconButton color="red" icon="logo-google" size={24} />
      </View>
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 20,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    justifyContent: "center",
  },
  loginText: {
    alignItems: "center",
    marginBottom: 30,
  },
  login: {
    color: "rgba(1, 1, 1, 0.85)",
    fontWeight: "500",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 200,
    // marginTop: 50,
    justifyContent: "center",
  },
  welcomeBack: {
    color: Colors.textColor100,
    fontSize: 24,
    fontWeight: "600",
  },
  buttons: {
    marginTop: 8,
  },
  rememberMe: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgotPassword: {
    color: Colors.textColor100,
    fontSize: 12,
    fontWeight: "400",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {},
  optionText: {
    fontWeight: "bold",
    color: Colors.textColor100,
  },
});
