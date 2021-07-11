import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function BottomHud(props) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.rows}>
        <FontAwesomeIcon
          icon="camera"
          size={20}
          style={props.selectedItem === 0 ? styles.selectedRow : styles.row}
        />
        <Text
          style={props.selectedItem === 0 ? styles.selectedRow : styles.row}>
          1. Take Picture
        </Text>
        <FontAwesomeIcon
          icon="id-card"
          size={20}
          style={props.selectedItem === 1 ? styles.selectedRow : styles.row}
        />
        <Text
          style={props.selectedItem === 1 ? styles.selectedRow : styles.row}>
          2. Scan ID
        </Text>
        <FontAwesomeIcon
          icon="thermometer"
          size={20}
          style={props.selectedItem === 2 ? styles.selectedRow : styles.row}
        />
        <Text
          style={props.selectedItem === 2 ? styles.selectedRow : styles.row}>
          3. Screening
        </Text>
        <FontAwesomeIcon
          icon="print"
          size={20}
          style={props.selectedItem === 3 ? styles.selectedRow : styles.row}
        />
        <Text
          style={props.selectedItem === 3 ? styles.selectedRow : styles.row}>
          {' '}
          4. Print Badge
        </Text>
      </View> */}
      <Button title="reset creds" onPress={props.resetCreds}>Reset Credentials</Button>
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
