import { View, Text, SafeAreaView, TextInput, Pressable, FlatList } from 'react-native'
import React from 'react'
import NotFound from '../svg/NotFound.jsx'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function Search({ notes}) {
    const [search, setSearch] = React.useState('')
    const navigation = useNavigation()

    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(search.toLowerCase())
    })
    const renderItem = ({ item }) => {
        return(
            <Pressable
                style={{ backgroundColor: item.select ? item.select : "#F15412", margin: 15, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }}
                onPress={() => navigation.navigate("Update", { item })}
            >
                <View>
                    <Text style={{ fontSize: 24, color: "#fff" }} numberOfLines={1}>{item.title}</Text>
                    <Text style={{ fontSize: 14 }} numberOfLines={1}>{moment().format('dddd')}</Text>
                </View>
            </Pressable>
        )
    }
    console.log(filteredNotes);
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
                    style={{ paddingHorizontal: 25, paddingVertical: 8, marginHorizontal: 15, borderRadius: 20, fontSize: 16, color: "white", backgroundColor: "#3B3B3B", width: "85%", height: 40, marginTop: 10 }}
                    placeholder='Search notes'
                    placeholderTextColor="#9A9A9A"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            <Pressable onPress={() => setSearch('')}>
                <Ionicons name="md-close" size={24} color="white" style={{ position: "absolute", top: -33, right:12 }} />
            </Pressable>
            {filteredNotes.length > 0 ? <View><FlatList data={filteredNotes} renderItem={renderItem} keyExtractor={(item) => item.select} /></View> : <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <NotFound />
                <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>File not found. Try searching again.</Text>
            </View> 
            }
        </SafeAreaView>
    )
}