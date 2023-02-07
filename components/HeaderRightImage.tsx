import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

const defaultImage = require("../assets/user.png"); // import default image

interface Props {
  userImage: string | null;
  navigation?: NavigationProp<any, any>;
}

const HeaderRight: React.FC<Props> = ({ userImage, navigation }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View>
            <Pressable android_ripple={{ color: "#cccc" }}>
              <Text
                onPress={() =>
                  navigation.navigate("Account", {
                    userId: session?.user.id,
                  })
                }
              >
                Profile
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            ></Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.image}>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.userImage} />
          ) : (
            <Image source={defaultImage} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  image: {
    paddingRight: 10,
  },
  userImage: {
    verticalAlign: "middle",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
