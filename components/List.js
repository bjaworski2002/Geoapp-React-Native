import {View, TouchableOpacity, Text, ActivityIndicator, FlatList, Switch} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from "react";
import * as Location from "expo-location";
export default function List(props){

    const [loading, setLoading] = useState(false)
    const [array, setArray] = useState([])
    const [firstSwitch, setFirstSwitch] = useState(false)
    const [switches, setSwitches] = useState({arr: []})
    const setPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }
    const renderItem = ({item, index}) => {
        return(
            <View style={{flex: 1, margin: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{marginRight: 10}}>
                    <Text>Index: {index}</Text>
                    <Text>Timestamp: {JSON.stringify(item.value.timestamp)}</Text>
                    <Text>latitude: {JSON.stringify(item.value.latitude)}</Text>
                    <Text>longitude: {JSON.stringify(item.value.longitude)}</Text>
                </View>
                <View style={{marginLeft: 10, padding: 10}}>
                    <Text>{switches.arr[index]}</Text>
                    <Switch value={switches.arr[index]} onChange={() => toggleSwitch(index)} />
                </View>
            </View>
        )
    }
    const toggleSwitch = (index) => {
        const tempSwitches = switches
        tempSwitches.arr[index] = !tempSwitches.arr[index]
        console.log(switches)
        setSwitches(tempSwitches)
        getAllData()
    }
    const toggleFirstSwitch = () => {
        setFirstSwitch(!firstSwitch)
        const tempSwitches = switches
        array.map((e, index) => {
            tempSwitches.arr[index] = !firstSwitch
        })
        setSwitches(tempSwitches)
        getAllData()
    }
    const deleteHandle = async () => {
        setLoading(true)
        await AsyncStorage.clear();
        getAllData()
        setLoading(false)
        alert("Dane zostały wyczyszczone")
    }
    const mapHandle = () => {
        const temparray = []
        array.map((e, index) => {
            if(switches.arr[index] === true) {
                console.log("Weszło")
                temparray.push(e)
            }
        })
        console.log(JSON.stringify(temparray))
        props.navigation.navigate("itemmap", {items: temparray})
    }
    const getPosition = async () => {
        setLoading(true)
        let pos = await Location.getCurrentPositionAsync({})
        await AsyncStorage.setItem(
            JSON.stringify({ key: pos.timestamp }),
            JSON.stringify({
                timestamp: pos.timestamp,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            })
        );

        const tempSwitches = switches
        tempSwitches.arr.push(false)
        setSwitches(tempSwitches)

        setLoading(false)
        getAllData()
        alert("USTAWIONO ITEM!")
    }

    const getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        //console.log("keys", keys)
        let stores = await AsyncStorage.multiGet(keys);
        //console.log("stores", stores)
        const arr = []
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            //console.log(key, value)
            arr.push({key: key, value: JSON.parse(value)})
        });
        //console.log(arr)
        setArray(arr)
    }
    useEffect(() => {
        setPermissions()
        getAllData()
        //console.log(`array = ${array}`)
    }, [])
    useEffect(() => {
        console.log("Zmiana!")
    }, [switches.arr])
    return(<View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
        {loading ?  <ActivityIndicator size="large" color="#3f51b5" /> :
            (
                <>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={getPosition}>
                            <View><Text>POBIERZ I ZAPISZ</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={deleteHandle}>
                            <View><Text>USUN WSZYSTKIE</Text></View>
                        </TouchableOpacity>
                    </View>
                    {array.length >= 1 ? (
                        <View style={{flex: 0.5, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                            <TouchableOpacity onPress={mapHandle} style={{padding: 10, paddingRight: 80}}>
                                <View><Text>ZOBACZ MAPĘ</Text></View>
                            </TouchableOpacity>
                            <Switch value={firstSwitch} onChange={toggleFirstSwitch}/>
                        </View>
                    ) : null}
                    <View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
                        <FlatList data={array} renderItem={renderItem} extraData={{...switches}}/>
                    </View>
                </>
            )}
    </View>)
}