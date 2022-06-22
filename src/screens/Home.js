import { View, Text, SafeAreaView, StyleSheet, FlatList, Pressable, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import NoData from "../svg/NoData.jsx";
import Header from "../components/Header.js";
import { FloatingAction } from "react-native-floating-action";
import { collection, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import db from "../auth/firebase.js";
import Search from "./Search.js";
import moment from "moment";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { async } from "@firebase/util";

export default function Home({ navigation }) {
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  console.log(notes);
  useEffect(() => {
    const q = query(collection(db, "notes"));
    const notesListener = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
      setIsLoading(false);
    });
    return notesListener;
  }, []);
  const rightActions = ({ item }) => {
    return (
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          deleteDoc(doc(db, "notes", item.id));
        }}
      >
        <View style={{ backgroundColor: "red", margin: 15, paddingVertical: 20, paddingHorizontal: 15, borderRadius: 10, flex: 1, justifyContent: "center", alignItems: "center", zIndex: 4 }}>
          <MaterialCommunityIcons name="delete" size={36} color="white" />
        </View>
      </Pressable>
    )
  }
  const renderItem = ({ item }) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() => rightActions({ item })}
        >
          <Pressable
            style={{ backgroundColor: item.select ? item.select : "#F15412", margin: 15, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }}
            onPress={() => navigation.navigate("Update", { item })}
          >
            <View>
              <Text style={{ fontSize: 24, color: "#fff" }} numberOfLines={1}>{item.title}</Text>
              <Text style={{ fontSize: 14 }} numberOfLines={1}>{moment().format('dddd')}</Text>
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
    )
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"#252525" }}>
        <ActivityIndicator size="large" color="#F15412" />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 12 }}>
        <Text style={{ color: '#fff', fontSize: 30 }}>Notes</Text>
        <Header icon="ios-search-sharp" />
      </View>
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing}/>}
      >
        {refreshing ? (<View style={styles.img}>
          <NoData />
          <Text style={styles.font}>Create your first note !</Text>
        </View>)
          : (<View><FlatList data={notes} renderItem={renderItem} keyExtractor={(item) => item.select} /></View>)
        }
      </ScrollView>
      <FloatingAction
        showBackground={false}
        color="#252525"
        onClose={false}
        floatingIcon={<MaterialCommunityIcons name="plus" size={28} color="#fff" />}
        onPressMain={() => navigation.navigate("AddNote")}
      />
      {/* <Search notes={notes}/> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  },
  img: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  font: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});