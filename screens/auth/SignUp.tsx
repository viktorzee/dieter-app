import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { createUser, signInWithFacebook } from "../../core";
import { AuthStackParamList } from "../../types/nav";
import { Colors } from "../../constants/Colors";

import LoadingOverlay from "../../components/UI/LoadingOverlay";
import Checkbox from "../../components/UI/Checkbox";
import FlatButton from "../../components/UI/FlatButton";
import IconButton from "../../components/UI/IconButton";

const SignUp = ({
  navigation,
}: StackScreenProps<AuthStackParamList, "SignUp">) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    email: "",
    cemail: "",
    password: "",
    cpassword: "",
  });

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    cemail: false,
    password: false,
    cpassword: false,
  });

  async function signUpWithEmail(email: string, password: string) {
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === credentials.cemail;
    const passwordsAreEqual = password === credentials.cpassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !emailsAreEqual ||
      !passwordsAreEqual
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
    setIsLoading(true);
    try {
      await createUser(email, password);
      Alert.alert("Success", "Your account was created");
      navigation.navigate("Login");
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error);
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Please wait, Signing you up" />;
  }
  return (
    <View style={styles.authContent}>
      <View style={styles.loginText}>
        <Image
          source={require("../../assets/welcomesline.png")}
          style={styles.image}
        />
        <Text style={styles.signUp}>SignUp</Text>
      </View>

      <View style={styles.rememberMe}>
        <Checkbox
          label="Remember me"
          onValueChange={(value) => console.log(value)}
        />
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          color="blue"
          icon="logo-facebook"
          size={24}
          style={styles.icon}
          onPress={() => signInWithFacebook()}
        />
        <IconButton color="red" icon="logo-google" size={24} />
      </View>
      <View style={styles.buttons}>
        <FlatButton
          onPress={() =>
            signUpWithEmail(credentials.email, credentials.password)
          }
        >
          Create a new user
        </FlatButton>
      </View>
    </View>
  );
};

export default SignUp;

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
  signUp: {
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
