import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ backBtn, icon, icon2, passedFunction, view }) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        {backBtn && (
          <Pressable
            style={{ marginRight: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="md-arrow-back-outline" size={24} color="white" />
          </Pressable>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Ionicons
              name={icon}
              size={24}
              color="white"
            />
          </Pressable>

          <Pressable
            onPress={passedFunction}
          >
            <Ionicons name={icon2} size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 12,
  },
});
