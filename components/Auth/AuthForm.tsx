import { StyleSheet, Text, View, TextInputProps } from "react-native";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../UI/Button";

interface AuthFormProps extends TextInputProps {
  isLogin: boolean;
  onSubmit: any;
  credentialsInvalid: any;
}

type FormFields = {
  email: string;
  cemail: string;
  password: string;
  cpassword: string;
};

const AuthForm = ({ credentialsInvalid, onSubmit, isLogin }: AuthFormProps) => {
  const [formValues, setFormValues] = useState({
    email: "",
    cemail: "",
    password: "",
    cpassword: "",
  });

  const handleTextChange = (name: keyof FormFields, text: string) => {
    setFormValues((prevFields) => ({ ...prevFields, [name]: text }));
  };

  const {
    email: emailIsInvalid,
    cemail: emailsDontMatch,
    password: passwordIsInvalid,
    cpassword: passwordsDontMatch,
  } = credentialsInvalid;

  function submitHandler() {
    onSubmit({
      email: formValues.email,
      cemail: formValues.cemail,
      password: formValues.password,
      cpassword: formValues.cpassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          accessibilityLabel="Email Address"
          onChangeText={(text) => handleTextChange("email", text)}
          value={formValues.email}
          keyboardType="default"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            accessibilityLabel="Confirm Email Address"
            onChangeText={(text) => handleTextChange("cemail", text)}
            value={formValues.cemail}
            keyboardType="default"
            style={styles.label}
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          accessibilityLabel="Password"
          onChangeText={(text) => handleTextChange("password", text)}
          value={formValues.password}
          keyboardType="default"
          isInvalid={passwordIsInvalid}
          secureTextEntry={true}
        />
        {!isLogin && (
          <Input
            accessibilityLabel="Password"
            onChangeText={(text) => handleTextChange("cpassword", text)}
            value={formValues.cpassword}
            keyboardType="visible-password"
            isInvalid={passwordsDontMatch}
            secureTextEntry={true}
          />
        )}
      </View>
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  label: {
    fontWeight: "400",
    fontSize: 20,
  },
  buttons: {
    marginTop: 12,
  },
});
