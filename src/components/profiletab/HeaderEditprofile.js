import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Line from './Line'

function HeaderEditprofile(props) {
    const {navigation}=props;
    return (
        <>
            
        </>
    );
}
const styles = StyleSheet.create({
    text:{
        color: "white",
    },
    title:{
        fontWeight:'bold',
        color: "white",
        fontSize:14,
    },
    container: {
        marginLeft: 8,
        marginTop:20,
        flexDirection: "row",
        justifyContent: 'space-between',
        borderBottomWidth:1,
    
    },
    boderbottom:{
        borderTopWidth:1,
        borderColor: "#cccc",
        opacity: 0.3,
        marginTop:9,
    }
})

export default HeaderEditprofile;