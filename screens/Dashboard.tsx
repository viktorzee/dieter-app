import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { MainStackParamList } from "../types/nav";
import SearchInput from "../components/SearchInput";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { dieticansData } from "../data/dieticianData";
import { data } from "../data/specialtyData";
import DieticansGrid from "../components/DieticansGrid";
import SpecialityGrid from "../components/SpecialityGrid";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const Dashboard = () => {
  const route = useRoute<RouteProp<MainStackParamList, "Home">>();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [searchPhrase, setSearchPhrase] = useState<String>("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const topRatedDietician = dieticansData.sort((a, b) => b.rating - a.rating);

  function renderTopDieticians(itemData) {
    const showSpecialty = data.find(
      (specialty) => specialty.id === itemData.item.specialty_id
    );

    return (
      <DieticansGrid
        id={itemData.item.id}
        imageUri={itemData.item.imageUri}
        username={itemData.item.username}
        specialty={showSpecialty === undefined ? null : showSpecialty.name}
        rating={itemData.item.rating}
        certification={itemData.item.certification}
      />
    );
  }
  function renderTopSpecialties(itemData) {
    return (
      <SpecialityGrid
        id={itemData.item.id}
        imageUri={itemData.item.imageUri}
        name={itemData.item.name}
      />
    );
  }

  return (
    <ScrollView>
      <LinearGradient colors={["#D3D3D3", "#FFC0CB"]} style={{ flex: 1 }}>
        <View style={styles.rootScreen} onLayout={onLayoutRootView}>
          <View>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.userName}>Miracle Ebenezer</Text>
          </View>
          <SearchInput
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />

          {/* Wavy background section */}
          <View style={styles.wavyBackground}>
            <View style={styles.topDieticians}>
              <Text style={styles.topText}>Top Dieticians</Text>
              <Pressable onPress={() => navigation.navigate("Dieticians")}>
                <Text style={styles.seeMore}>See more</Text>
              </Pressable>
            </View>
            <FlatList
              renderItem={renderTopDieticians}
              data={topRatedDietician.slice(0, 2)}
              numColumns={3}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.topDieticians}>
              <Text style={styles.topText}>Specialty</Text>
              <Pressable onPress={() => navigation.navigate("Specialties")}>
                <Text style={styles.seeMore}>See more</Text>
              </Pressable>
            </View>
            <FlatList
              renderItem={renderTopSpecialties}
              data={data.slice(0, 6)}
              numColumns={3}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingLeft: 10,
  },
  helloText: {
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 22,
    marginBottom: 12,
  },
  userName: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 22,
  },
  wavyBackground: {
    marginTop: 40,
  },
  topDieticians: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 17,
  },
  seeMore: {
    fontFamily: "Poppins",
    marginRight: 25,
  },
});
