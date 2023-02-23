import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { data } from "../data/specialtyData";
import { MainStackParamList } from "../types/nav";

export default function SpecialtyDetail() {
  const route = useRoute<RouteProp<MainStackParamList, "SpecialtyDetail">>();
  const navigation = useNavigation<NavigationProp<any, any>>();

  const specialtyId = route.params.specialtyId;

  const selectedSpecialty = data.find(
    (specialty) => specialty.id === specialtyId
  );

  useEffect(() => {
    navigation.setOptions({
      title: selectedSpecialty.name,
    });
  }, [specialtyId, navigation]);

  return (
    <ScrollView style={styles.rootContainer}>
      <LinearGradient colors={["#D3D3D3", "#FFC0CB"]}>
        <Image source={selectedSpecialty.imageUri} style={styles.image} />
        <Text style={styles.title}>{selectedSpecialty.name}</Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 8,
    textAlign: "center",
    color: "white",
  },
});
