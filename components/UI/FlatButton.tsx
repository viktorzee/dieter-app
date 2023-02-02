import { Pressable, StyleSheet, Text, View } from "react-native";
import { ButtonProps } from "react-native-elements";
import { Colors } from "../../constants/Colors";

function FlatButton({ children, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.textColor100,
    fontWeight: "bold",
    fontSize: 16,
  },
});
