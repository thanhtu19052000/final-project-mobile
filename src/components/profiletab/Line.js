import React from 'react';
import {View,StyleSheet} from 'react-native';



function Line(props) {
    return (
        <View style={styles.container}></View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop:8,
        marginBottom:8,
        borderTopWidth:0.5,
        borderColor: '#cccc',
        opacity: 0.3,
    }
})


export default Line;