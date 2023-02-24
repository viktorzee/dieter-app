import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DieticansGrid from "../components/DieticansGrid";
import SearchInput from "../components/SearchInput";
import { dieticansData } from "../data/dieticianData";
import { data } from "../data/specialtyData";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function Dieticans() {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [searchPhrase, setSearchPhrase] = useState<String>("");
  const [clicked, setClicked] = useState(false);

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
  return (
    <LinearGradient colors={["#D3D3D3", "#FFC0CB"]} style={{ flex: 1 }}>
      <View style={styles.rootScreen}>
        <SearchInput
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

        {/* Wavy background section */}
        <View
          style={{
            marginBottom: 120,
          }}
        >
          <FlatList
            renderItem={renderTopDieticians}
            data={topRatedDietician}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingLeft: 10,
  },
});
