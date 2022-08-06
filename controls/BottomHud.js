import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  SafeAreaView,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryTextInput,
} from '../controls/styles';
import CardView from './CardView';

function BottomHud(props) {
  //<Button title="Reset Project Credentials" onPress={props.resetCreds}>Reset Credentials</Button>
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.resetCreds} style={styles.myIcon}>
        <FontAwesomeIcon style={{color: '#d1dfea'}} icon="undo" />
      </TouchableOpacity>
      <Button
        title="Reset Project Credentials"
        style={styles.myButton}
        color="#d1dfea"
        onPress={props.resetCreds}>
        <PrimaryButtonText style={styles.myButtonText}></PrimaryButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  myButtonText: {
    //color: '#ADB5BD',
    fontSize: 18,
  },
  myButton: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  myIcon: {
    marginHorizontal: 8,
    color: '#d1dfea',
  },
  container: {
    backgroundColor: '#548ab4',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    color: '#a4a4a4',
    bottom: 35,
    left: 20,
    right: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default BottomHud;
