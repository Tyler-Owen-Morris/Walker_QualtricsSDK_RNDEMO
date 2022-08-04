import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  SafeAreaView,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryTextInput,
} from '../controls/styles';

function BottomHud(props) {
  //<Button title="Reset Project Credentials" onPress={props.resetCreds}>Reset Credentials</Button>
  return (
    <View style={styles.container}>
      <PrimaryButton onPress={props.resetCreds}>
        <PrimaryButtonText>
          <FontAwesomeIcon icon="circle-xmark" />
          Reset Project Credentials
        </PrimaryButtonText>
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row: {
    color: '#ADB5BD',
    fontSize: 18,
  },
  selectedRow: {
    color: '#007BFF',
    fontSize: 18,
  },
  container: {
    marginTop: 10,
    marginHorizontal: 30,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    color: '#e7e3e3',
    borderRadius: 20,
  },
});

export default BottomHud;
