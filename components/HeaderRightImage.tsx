import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
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

  const toggleModalVisibility = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ marginRight: 15 }}>
      <TouchableOpacity onPress={toggleModalVisibility}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.userImage} />
        ) : (
          <Image source={defaultImage} />
        )}
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#007AFF" }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: "#007AFF", marginTop: 10 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60, // Adjust this value to position the modal as desired
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    paddingRight: 10,
  },
  userImage: {
    verticalAlign: "middle",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
