import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import IconButton from "./UI/IconButton";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function DieticansGrid({
  id,
  imageUri,
  username,
  specialty,
  rating,
  certification,
}) {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function selectDietician() {
    navigation.navigate("DieticianDetail", {
      dietician_id: id,
    });
  }

  return (
    <View style={styles.grid} onLayout={onLayoutRootView}>
      <TouchableOpacity style={styles.button} onPress={selectDietician}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
        <View style={styles.infoCard}>
          <Text style={styles.dietUsername}>
            {username}, {certification}
          </Text>
          <Text>{specialty}</Text>
          <View style={styles.rating}>
            <IconButton
              color="#F24E1E"
              icon="star"
              size={16}
              style={styles.icon}
            />
            <Text style={{ marginLeft: 5 }}>{rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    margin: 16,
    height: 210,
    width: 158,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "black",
    // paddingBottom: 5,
  },
  pressed: {
    opacity: 0.5,
  },
  button: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoCard: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    width: 130,
    height: 75,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    opacity: 1,
    position: "absolute",
    bottom: 1,
    right: -5,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dietUsername: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 18,
    color: "#000",
  },
  icon: {
    marginRight: 8,
  },
});
