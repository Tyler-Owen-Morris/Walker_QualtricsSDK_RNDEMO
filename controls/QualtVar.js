import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

function QualtVar(props) {
  console.log('var input: ', props.input);
  console.log('var props', props);
  const [key, setKey] = useState(props.key);
  const [name, setName] = useState(props.input.name);
  const [val, setVal] = useState(props.input.value);
  const [numeric, setNumeric] = useState(false);

  useEffect(() => {
    setKey(props.input.key);
    setName(props.input.name);
    setVal(props.input.value);
  }, [props.input]);

  useEffect(() => {
    if (val == '') {
      setNumeric(false);
      return;
    }
    let v = parseInt(val);
    try {
      let isNum = val.match(/^[0-9]*$/) != null;
      console.log('isnum:', isNum);
      console.log('val:', val);
      console.log('v', v);
      if (!isNum) {
        //Qualtrics.setString(name, val);
        setNumeric(false);
      } else {
        setNumeric(true);
      }
    } catch (e) {
      setNumeric(false);
    }
  }, [val]);

  function onVarNameChange(e) {
    //console.log('name-change:', e);
    //Qualtrics.setString(name, '');
    setName(e);
    props.changeName(key, e, val, name);
  }

  function onVarValChange(e) {
    //console.log('val-change:', e);
    setVal(e);
    props.changeValue(key, name, e);
  }
  function deleteMe() {
    //console.log('reging');
    //Qualtrics.setString(name, '');
    props.removeVar(props.input.key);
  }

  return (
    <>
      <View style={styles.bar}>
        <ScrollView style={styles.inputContainer} horizontal={true}>
          <View style={{flexDirection: 'row', marginLeft: 10}}>
            <TextInput
              style={styles.varText}
              onChangeText={onVarNameChange}
              placeholder="Name"
              value={name}
              autoCapitalize="none"></TextInput>
            <Text style={{fontSize: 18, padding: 10}}>:</Text>
            <TextInput
              onChangeText={onVarValChange}
              placeholder="Value"
              style={numeric ? styles.varNumeric : styles.varText}
              value={val}
              autoCapitalize="none"></TextInput>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={deleteMe}>
          <Text style={styles.removeTextWrapper}>
            &nbsp;&nbsp;
            <FontAwesomeIcon
              icon="minus-circle"
              size={27}
              style={styles.removeIcon}
            />
            &nbsp;&nbsp;
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.barSeparator} />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 1,
    //backgroundColor: '#bfbfbf',
    //borderRadius: 15,
    padding: 5,
    borderColor: 'black',
    marginHorizontal: -21,
    //borderRadius: 1,
  },
  barSeparator: {
    backgroundColor: '#bfbfbf',
    height: 1,
    opacity: 0.5,
    marginHorizontal: -21,
    marginVertical: 2,
  },
  removeTextWrapper: {
    borderRadius: 10,
    fontSize: 30,
    //backgroundColor: 'white',
    //margin: 7,
    //paddingHorizontal: 20,
    //alignSelf: 'center',
    //borderWidth: 1,
    //width: 20,
    //backgroundColor: 'red',
    paddingBottom: 10,
  },
  inputContainer: {
    //borderWidth: 1,
    paddingVertical: 4,
    borderRadius: 10,
    //backgroundColor: '#d3d3d3',
  },
  removeIcon: {
    color: '#db4021',
    // scaleX: 1.5,
    // scaleY: 1.5,
  },
  varText: {
    fontSize: 18,
    //marginHorizontal: 15,
    paddingVertical: 10,
    //borderColor: 'gray',
    //borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f8fc',
    minWidth: 130,
    //backgroundColor: 'red'
  },
  varNumeric: {
    fontSize: 18,
    //marginLeft: 15,
    //borderColor: 'gray',
    //borderWidth: 1,
    padding: 10,
    minWidth: 130,
    borderRadius: 10,
    backgroundColor: '#f0f7e7',
  },
});

export default QualtVar;
