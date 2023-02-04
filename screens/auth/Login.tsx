import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { authenticate, signInWithFacebook } from "../../core";
import { NavigationProp } from "@react-navigation/native";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useAppDispatch, useAppSelector } from "../../state-management/hook";
import {
  login,
  selectIsAuthenticated,
} from "../../state-management/features/authSlice";
import { Colors } from "../../constants/Colors";
import Checkbox from "../../components/UI/Checkbox";
import FlatButton from "../../components/UI/FlatButton";
import IconButton from "../../components/UI/IconButton";
import Button from "../../components/UI/Button";
import Input from "../../components/Input";

type ParamList = {
  navigation: NavigationProp<any, any>;
};

type FormFields = {
  email: string;
  password: string;
};

const Login = ({ navigation }: ParamList) => {
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [isAuthenticated, navigation]);

  const handleTextChange = (name: keyof FormFields, text: string) => {
    setCredentials((prevFields) => ({ ...prevFields, [name]: text }));
  };

  async function signInWithEmail(email: string, password: string) {
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
  return (
    <View style={styles.authContent}>
      <View style={styles.loginText}>
        <Image
          source={require("../../assets/welcomesline.png")}
          style={styles.image}
        />
        <Text style={styles.welcomeBack}>Welcome back!</Text>
        <Text style={styles.login}>Login to your existing account</Text>
      </View>
      <View>
        <Input
          accessibilityLabel="Email Address"
          onChangeText={(text) => handleTextChange("email", text)}
          value={credentials.email}
          keyboardType="default"
        />

        <Input
          accessibilityLabel="Password"
          onChangeText={(text) => handleTextChange("password", text)}
          value={credentials.password}
          keyboardType="default"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.rememberMe}>
        <Checkbox
          label="Remember me"
          onValueChange={(value) => console.log(value)}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ForgotPassword", { screen: "ForgotPassword" })
          }
        >
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
        <Button
          onPress={() =>
            signInWithEmail(credentials.email, credentials.password)
          }
        >
          Log in
        </Button>
      </View>
    </View>
  );
};

export default Login;

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
  label: {
    fontWeight: "400",
    fontSize: 20,
  },
});
