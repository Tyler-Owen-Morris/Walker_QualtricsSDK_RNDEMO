import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
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
      <PrimaryButton style={styles.myButton} onPress={props.resetCreds}>
        <PrimaryButtonText style={styles.myButtonText}>
          <FontAwesomeIcon style={styles.myIcon} icon="undo" />
          Reset Project Credentials
        </PrimaryButtonText>
      </PrimaryButton>
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
    paddingHorizontal: 20,
  },
  myIcon: {
    marginHorizontal: 8,
    color: 'white',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
  },
});

export default BottomHud;
