import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React from 'react'
import Header from '../components/Header.js';
import SelectDropdown from 'react-native-select-dropdown';
import {doc, updateDoc } from 'firebase/firestore';
import db from '../auth/firebase.js';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { category } from '../theme/color.js';

export default function Update({ navigation, route }) {
    const noteItem = route.params.item;
    console.log(noteItem);
    const [title, setTitle] = React.useState(noteItem.title);
    const [content, setContent] = React.useState(noteItem.content);
    const [select, setSelect] = React.useState(noteItem.select);
    const passedFunctionUpdate = async () => {
        try {
           const docRef = await updateDoc(doc(db, "notes", noteItem.id), {
                title: title,
                content: content,
                select: select,
            });
            console.log(docRef);
        } catch (e) {
            console.error("Error update document: ", e);
        }
        navigation.navigate("Home");
    }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
          <Header backBtn={true}  icon2="save-outline" passedFunction={passedFunctionUpdate}/>
          <ScrollView>
              <View>
                  <TextInput
                      style={{ padding: 20, marginTop: 10, fontSize: 30, color: "white" }}
                      placeholder="Title"
                      placeholderTextColor="#9A9A9A"
                      selectionColor="gray"
                      multiline={true}
                      maxLength={60}
                      onChangeText={(text) => setTitle(text)}
                      value={title}
                  />
                  <View
                      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                      <SelectDropdown
                          data={category}
                          defaultButtonText="No category"
                          defaultValue={select}
                          dropdownBackgroundColor="#252525"
                          buttonTextStyle={{ color: "#9A9A9A", fontSize: 18 }}
                          buttonStyle={{ backgroundColor: "#252525", borderRadius: 10, color: "#fff", height: 20, width: 140, textAlign: "left" }}
                          dropdownStyle={{ backgroundColor: "#252525", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, width: 200, height: "auto", }}
                          rowTextStyle={{ color: "#fff", textAlign: "left",fontSize:18 }}
                          onSelect={(item) => setSelect(item)}
                          renderDropdownIcon={() => <AntDesign name="down" size={10} color="#fff" />}
                          rowStyle={{ borderBottomColor: "#9A9A9A", borderBottomWidth: 1 }}
                      />
                      <Text style={{ color: "#9A9A9A", marginHorizontal: 10 }}>{moment().calendar()}</Text>
                  </View>
                  <TextInput
                      style={{ padding: 20, fontSize: 18, color: "white", textAlign: "justify" }}
                      multiline={true}
                      placeholder="Type something..."
                      placeholderTextColor="#9A9A9A"
                      selectionColor="gray"
                      onChangeText={(text) => setContent(text)}
                      value={content}
                  />
              </View>
          </ScrollView>
      </SafeAreaView>
  )
}