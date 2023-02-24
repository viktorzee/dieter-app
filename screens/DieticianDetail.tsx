import { RouteProp, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useCallback, useRef } from "react";
import {
  Animated,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { dieticansData } from "../data/dieticianData";
import { MainStackParamList } from "../types/nav";
import IconButton from "../components/UI/IconButton";
import { data } from "../data/specialtyData";

export default function DieticianDetail() {
  const route = useRoute<RouteProp<MainStackParamList, "DieticianDetail">>();

  const dieticianId = route.params.dietician_id;

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const selectedDeitician = dieticansData.find(
    (dietician) => dietician.id === dieticianId
  );

  const showSpecialty = data.find(
    (specialty) => specialty.id === selectedDeitician.specialty_id
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const displayMemberOrganization = () => {
    if (selectedDeitician.memberOrganization === null) {
      return <Text>N/A</Text>;
    } else if (
      selectedDeitician.memberOrganization !== null &&
      Array.isArray(selectedDeitician.memberOrganization)
    ) {
      return (
        <View>
          {selectedDeitician.memberOrganization.map((member) => (
            <View
              key={member}
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.bullet}>•</Text>
              <Text>{member}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.bullet}>•</Text>
          <Text>{selectedDeitician.memberOrganization}</Text>
        </View>
      );
    }
  };

  const handleWebsiteClick = async (url) => {
    if (!url) {
      console.warn(`No website provided for ${url}`);
      return;
    }
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.warn(`Cannot open website: ${url}`);
    }
  };

  const displayArticles = () => {
    if (
      Array.isArray(selectedDeitician.articles) &&
      selectedDeitician.articles.length > 0
    ) {
      return (
        <View>
          {selectedDeitician.articles.map((article) => (
            <TouchableOpacity
              key={article.name}
              onPress={() => handleWebsiteClick(article.url)}
            >
              <View>
                <Text style={styles.link}>{article.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return <Text>N/A</Text>;
    }
  };

  const displayWebsite = () => {
    if (selectedDeitician.website.length > 0) {
      return (
        <View>
          {selectedDeitician.website.map((article) => (
            <TouchableOpacity
              key={article.name}
              onPress={() => handleWebsiteClick(article.url)}
            >
              <View>
                <Text style={styles.link}>{article.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return <Text>N/A</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
      >
        <Animated.Image
          style={[styles.headerImage, { opacity: headerOpacity }]}
          source={{
            uri: selectedDeitician.imageUri,
          }}
        />
        <View style={styles.modalContent}>
          <View style={styles.dieticianDetails}>
            <Text style={styles.heading}>{selectedDeitician.fullName}</Text>
            <Text
              style={{
                alignItems: "center",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                color="grey"
                icon="location-sharp"
                size={20}
                style={styles.icon}
              />{" "}
              {selectedDeitician.location}
            </Text>
            <View style={styles.ratingContainer}>
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                <IconButton
                  color="#F24E1E"
                  icon="star"
                  size={16}
                  style={styles.icon}
                />{" "}
                {selectedDeitician.rating}
              </Text>
            </View>
          </View>
          {/* The rest of your body content */}
          <View style={styles.body}>
            {/* Fees */}
            <View>
              <Text style={styles.subHeading}>Fees</Text>
              <Text>
                Initial consultation:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {selectedDeitician.initialConsultation}/hour
                </Text>
              </Text>
              <Text>
                Follow up consultation:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  £{selectedDeitician.followUpConsultation}/hour
                </Text>
              </Text>
            </View>
            {/* Description */}
            <View>
              <Text style={styles.subHeading}>About</Text>
              <Text>{selectedDeitician.about}</Text>
            </View>
            {/* Qualification */}
            <View>
              <Text style={styles.subHeading}>
                Qualification & Certification
              </Text>
              <View>
                <Text>{selectedDeitician.certification}</Text>
              </View>
            </View>
            {/* Member Organiztion */}
            <View>
              <Text style={styles.subHeading}>Member Organization</Text>

              {displayMemberOrganization()}
            </View>

            {/* External Links */}
            <View>
              <Text style={styles.subHeading}>Externals</Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 2,
                    marginRight: 15,
                  }}
                >
                  <IconButton
                    icon="ios-logo-twitter"
                    size={26}
                    color="#3b5998"
                  />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 2,
                    marginRight: 15,
                  }}
                >
                  <IconButton icon="logo-facebook" size={26} color="#3b5998" />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 2,
                    marginRight: 15,
                  }}
                >
                  <IconButton
                    icon="logo-instagram"
                    size={26}
                    color={["#E1306C", "#F77737"]}
                  />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 2,
                  }}
                >
                  <IconButton icon="logo-linkedin" size={26} color="#0A66C2" />
                </View>
              </View>
            </View>

            {/* Website */}
            <View>
              <Text style={styles.subHeading}>Websites</Text>

              {displayWebsite()}
            </View>
            {/* Articles */}
            <View>
              <Text style={styles.subHeading}>Articles: </Text>

              {displayArticles()}
            </View>
            {/* Specialization */}
            <View>
              <Text style={styles.subHeading}>Specialization</Text>

              <View style={styles.specialization}>
                <View style={styles.specialtyContainer}>
                  <Text style={styles.specialtyName}>{showSpecialty.name}</Text>
                </View>
              </View>
            </View>
            {/* Ratings and comments */}
            {/* <View>
              <Text style={styles.subHeading}>
                <IconButton
                  color="#F24E1E"
                  icon="star"
                  size={16}
                  style={styles.icon}
                />{" "}
                {selectedDeitician.rating}
              </Text>
              <View>
                <Text>Commentz goes here</Text>
              </View>
            </View> */}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerImage: {
    height: 200,
    opacity: 1,
  },
  modalContent: {
    // position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    // alignItems: "center",
    borderTopRightRadius: 15,
    borderLeftRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dieticianDetails: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  body: {
    // fontSize: 16,
    marginLeft: 15,
    marginBottom: 25,
  },
  subHeading: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: 18,
    marginVertical: 7,
  },
  memberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bullet: {
    fontSize: 20,
    color: "#000",
    marginRight: 15,
  },
  link: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 18,
  },
  specialization: {
    flexDirection: "row",
    alignItems: "center",
  },
  specialtyContainer: {
    flex: 0,
    borderRadius: 20,
    backgroundColor: "#eee",
    padding: 10,
  },
  specialtyName: {
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});
