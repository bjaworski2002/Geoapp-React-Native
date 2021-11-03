import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import * as Font from "expo-font";

export default function Main(props){
    const [loading, setLoading] = useState(true)
    const onPressHandle = () => {
        props.navigation.navigate("list")
    }
    useEffect(async () => {
        await Font.loadAsync({
            'Bold': require('../assets/fonts/Bold.ttf'),
            'Regular': require('../assets/fonts/Regular.ttf'),
            'Light': require('../assets/fonts/Light.ttf'),
        });
        setLoading(false)
    }, [])
    return(
        <View style={{flex: 1}}>
            {loading ? null : <View style={{flex: 1}}>
                <View style={styles.top}>
                    <Text style={styles.mainText}>Geomap App</Text>
                    <Text style={styles.text}>Find And Save your Location</Text>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={onPressHandle}>
                    <Text>START</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        display: "flex",
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3f51b5",
    },
    bottom: {
        display: "flex",
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    mainText: {
        fontSize: 32,
        color: "white",
        fontFamily: "Bold",
    },
    text: {
        fontSize: 16,
        color: "white",
    }
});