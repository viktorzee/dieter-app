import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";
import FlatButton from "../../components/UI/FlatButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../types/nav";
import { resetEmail } from "../../core";
import Button from "../../components/UI/Button";

const ForgotPassword = ({
  navigation,
}: StackScreenProps<AuthStackParamList, "ForgotPassword">) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function forget(email: string) {
    setIsLoading(true);
    try {
      await resetEmail(email);
      setIsLoading(false);
    } catch (error: any) {
      Alert.alert(error);
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <View style={styles.rootScreen}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/forget.png")}
        />
      </View>
      <View>
        <Text>Email</Text>
        <Input
          placeholder="Enter your email"
          value={email}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Button onPress={() => forget(email)} disabled={isLoading}>
          {isLoading ? "Loading" : "Send email"}
        </Button>
        <View style={styles.loginText}>
          <Text>Already have an Account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.text}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 25,
    height: 220,
    width: 220,
  },
  loginText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
