import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    TextInput,
    ScrollView,
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import React from "react";
import Header from "../components/Header.js";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import db from "../auth/firebase.js";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import { category } from "../theme/color.js";
export default function AddNote() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [select, setSelect] = React.useState("");
    const navigation = useNavigation();
    const passedFunctionCreate = async () => {
        try {
          const docRef = await addDoc(collection(db, "notes"), {
                title: title,
                content: content,
                select: select,
            });
            console.log(docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        navigation.navigate("Home");
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
            <Header backBtn={true} icon2="save-outline" passedFunction={passedFunctionCreate} />
            <ScrollView>
                <View>
                    <TextInput
                        style={{ padding: 20, fontSize: 30, color: "white" }}
                        placeholder="Title"
                        placeholderTextColor="#9A9A9A"
                        selectionColor="gray"
                        multiline={true}
                        maxLength={60}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <View 
                    style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                        <SelectDropdown
                            data={category}
                            defaultButtonText="No category"
                            dropdownBackgroundColor="#252525"
                            buttonTextStyle={{ color: "#9A9A9A", fontSize: 16 }}
                            buttonStyle={{ backgroundColor: "#252525", borderRadius: 10, color: "#fff", height: 20, width: 140,textAlign:"left" }}
                            dropdownStyle={{ backgroundColor: "#252525", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, width: 200, height: "auto",}}
                            rowTextStyle={{ color: "#fff",textAlign:"left" }}
                            onSelect={(item) => setSelect(item)}
                            renderDropdownIcon={() => <AntDesign name="down" size={10} color="#fff" />}
                            rowStyle={{ borderBottomColor: "#9A9A9A", borderBottomWidth: 1 }}
                        />
                        <Text style={{ color:"#9A9A9A",marginHorizontal:10}}>{moment().calendar()}</Text>
                    </View>
                    <TextInput
                        style={{ padding: 20, fontSize: 18, color: "white", textAlign: "justify" }}
                        multiline={true}
                        placeholder="Type something..."
                        placeholderTextColor="#9A9A9A"
                        selectionColor="gray"
                        onChangeText={(text) => setContent(text)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
