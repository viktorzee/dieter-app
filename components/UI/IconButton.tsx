import { Pressable, StyleSheet, PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps } from "./Button";

interface IconButtonProp extends PressableProps {
  color: any;
  size: number;
  icon: any;
}

function IconButton({ icon, color, size, onPress }: IconButtonProp) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
