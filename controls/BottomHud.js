import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function BottomHud(props) {
  return (
    <View style={styles.container}>
      <Button title="Reset Project Credentials" onPress={props.resetCreds}>
        Reset Credentials
      </Button>
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
    marginTop: 20,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
});

export default BottomHud;
