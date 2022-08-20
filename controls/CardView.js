import React from 'react';
import {StyleSheet, View} from 'react-native';

function CardView(props) {
  return (
    <View
      style={styles(props).container}
      width={props.width}
      height={props.height}>
      {props.children}
    </View>
  );
}

const styles = props =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: '#e9ecef',
      //borderRadius: 10,
      justifyContent: 'space-between',
      padding: props.padding ? props.padding : 20,
      backgroundColor: '#ffffff',
    },
  });

export default CardView;
