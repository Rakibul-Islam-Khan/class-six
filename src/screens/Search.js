import { View, Text, SafeAreaView, TextInput, Pressable } from 'react-native'
import React from 'react'
import NotFound from '../svg/NotFound.jsx'
import { Ionicons } from '@expo/vector-icons';

export default function Search({ notes, navigation }) {
    const [search, setSearch] = React.useState('')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#252525' }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ marginLeft: 10 }}
                >
                    <Ionicons name="md-arrow-back-outline" size={24} color="white" />
                </Pressable>
                <TextInput
                    style={{ paddingHorizontal: 25, paddingVertical: 8, marginHorizontal: 15, borderRadius: 20, fontSize: 16, color: "white", backgroundColor: "#3B3B3B", backgroundColor: "#fff", width: "85%", height: 40, marginTop: 10 }}
                    placeholder='Search notes'
                    placeholderTextColor="#9A9A9A"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            {/* <Pressable onPress={() => setSearch('')}>
                <Ionicons name="md-close" size={24} color="white" style={{ position: "absolute", top: -34, right: 20 }} />
            </Pressable> */}
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <NotFound />
                <Text style={{ color: "white", fontSize: 20,marginTop:20 }}>File not found. Try searching again.</Text>
            </View>
        </SafeAreaView>
    )
}