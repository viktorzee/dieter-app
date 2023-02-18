import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function SpecialityGrid({ imageUri, name, id }: any) {
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

  function selectSpecialty() {
    navigation.navigate("SpecialtyDetail", {
      specialtyId: id,
    });
  }

  return (
    <View style={styles.grid} onLayout={onLayoutRootView}>
      <TouchableOpacity style={styles.button} onPress={selectSpecialty}>
        <View style={styles.specialtyBox}>
          <Image source={imageUri} style={styles.image} />
          <Text style={styles.dietUsername}>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    height: 85,
    borderRadius: 10,
    backgroundColor: "white",
    // paddingBottom: 5,
  },
  pressed: {
    opacity: 0.5,
  },
  button: {
    flex: 1,
  },

  image: {
    width: 30,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    height: 85,
    borderRadius: 10,
    backgroundColor: "white",
  },
  specialtyBox: {
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
  },
});
