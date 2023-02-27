import { Alert, Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { authClient, signInWithFacebook } from "../../core";
import { AuthStackParamList } from "../../types/nav";
import { Colors } from "../../constants/Colors";

import LoadingOverlay from "../../components/UI/LoadingOverlay";
import IconButton from "../../components/UI/IconButton";
import Button from "../../components/UI/Button";
import Input from "../../components/Input";

type FormFields = {
  email: string;
  cemail: string;
  password: string;
  cpassword: string;
};

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
  //Adamawa -> Fuffre
  // APC -> 12, 633 , LP 897 pdp 26059
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    cemail: false,
    password: false,
    cpassword: false,
  });

  const handleTextChange = (name: keyof FormFields, text: string) => {
    setCredentials((prevFields) => ({ ...prevFields, [name]: text }));
  };

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
    const { error } = await authClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setIsLoading(false);
    } else {
      Alert.alert("Success", "Your account was created");
      navigation.navigate("Login");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Please wait, Signing you up" />;
  }
  return (
    <ScrollView>
      <View style={styles.authContent}>
        <View style={styles.loginText}>
          {/* <Image
            source={require("../../assets/welcomesline.png")}
            style={styles.image}
          /> */}
          <Text style={styles.signUp}>SignUp</Text>
        </View>
        <View>
          <View>
            <Input
              accessibilityLabel="Email Address"
              onChangeText={(text) => handleTextChange("email", text)}
              value={credentials.email}
              keyboardType="default"
              isInvalid={credentialsInvalid.email}
            />
            <Input
              accessibilityLabel="Confirm Email Address"
              onChangeText={(text) => handleTextChange("cemail", text)}
              value={credentials.cemail}
              keyboardType="default"
              isInvalid={credentialsInvalid.cemail}
            />
            <Input
              accessibilityLabel="Password"
              onChangeText={(text) => handleTextChange("password", text)}
              value={credentials.password}
              keyboardType="default"
              isInvalid={credentialsInvalid.password}
              secureTextEntry={true}
            />

            <Input
              accessibilityLabel="Confirm Password"
              onChangeText={(text) => handleTextChange("cpassword", text)}
              value={credentials.cpassword}
              keyboardType="visible-password"
              isInvalid={credentialsInvalid.cpassword}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() =>
              signUpWithEmail(credentials.email, credentials.password)
            }
          >
            Sign Up
          </Button>
        </View>
        {/* Sign up with social */}
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
      </View>
    </ScrollView>
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
    marginTop: 80,
  },
  login: {
    color: "rgba(1, 1, 1, 0.85)",
    fontWeight: "500",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 200,
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
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {},
  optionText: {
    fontWeight: "bold",
    color: Colors.textColor100,
  },
  label: {
    fontWeight: "400",
    fontSize: 20,
  },
});
