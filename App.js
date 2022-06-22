import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import AddNote from "./src/screens/AddNote.js";
import Search from "./src/screens/Search.js";
import Update from "./src/screens/Update.js";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddNote" component={AddNote} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Update" component={Update} />
          {/* <Stack.Screen name="Login" component={Login} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark-content" />
    </>
  );
}
