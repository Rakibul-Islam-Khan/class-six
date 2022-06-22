import { StatusBar } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import AddNote from "./src/screens/AddNote.js";
import Search from "./src/screens/Search.js";
import Update from "./src/screens/Update.js";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "./src/auth/firebase.js";



const Stack = createNativeStackNavigator();

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={() => <Home notes={notes} isLoading={isLoading} />} />
          <Stack.Screen name="AddNote" component={AddNote} />
          <Stack.Screen name="Search" component={() => <Search notes={notes}/>} />
          <Stack.Screen name="Update" component={Update} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark-content" />
    </>
  );
}
