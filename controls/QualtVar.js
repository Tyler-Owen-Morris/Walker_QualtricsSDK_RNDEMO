import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function QualtVar(props) {
    console.log("qualt props:", props);
    const [name, setName] = useState(props.input.key);
    const [val, setVal] = useState(props.input.value);

    return (
        <View style={styles.bar}>
            <Text style={styles.removeText}>-</Text>
            <TextInput
                style={styles.varText}
                value={name} >
            </TextInput>
            <Text style={{ fontSize: 18, padding: 10, marginLeft: 15 }} >:</Text>
            <TextInput
                style={styles.varText}
                value={val} >
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        //backgroundColor: 'blue'
    },
    removeText: {
        fontSize: 30,
        // backgroundColor: 'yellow',
        margin: 7,
        paddingLeft: 20,
        alignSelf: 'center',
        //borderWidth: 1,
        width: 60,
    },
    varText: {
        fontSize: 18,
        marginLeft: 15,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10
        //backgroundColor: 'red'
    }
})

export default QualtVar;