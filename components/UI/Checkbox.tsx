import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  initialValue?: boolean;
  onValueChange: (value: boolean) => void;
}

const Checkbox = (props: Props) => {
  const [isChecked, setIsChecked] = useState(props.initialValue || false);

  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          {isChecked && <View style={styles.check} />}
        </View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    width: 10,
    height: 10,
    color: "rgba(120, 120, 120, 0.65)",
  },
  label: {
    marginLeft: 10,
  },
});
