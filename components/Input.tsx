import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

interface CustomInputProps extends TextInputProps {
  isInvalid?: any;
}

const Input = ({
  onChangeText,
  secureTextEntry,
  keyboardType,
  isInvalid,
  value,
  accessibilityLabel,
  style,
}: CustomInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, style, isInvalid && styles.labelInvalid]}>
        {accessibilityLabel}
      </Text>
      <TextInput
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        style={[styles.input, isInvalid && styles.inputInvalid]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "rgba(20,20,20,0.65)",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.input100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
