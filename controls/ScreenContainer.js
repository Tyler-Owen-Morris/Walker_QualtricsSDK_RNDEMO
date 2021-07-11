import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {updateAuth} from '../redux/actions/authActions';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  ImageLogo,
  SecondaryButton,
  SecondaryButtonText,
} from '../controls/styles';

function ScreenContainer({props, setLogin}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <ImageLogo source={require('../assets/timbergrove_logo.png')} />
        </View>
        {!props.hideCall && (
          <SecondaryButton onPress={callAdmin} style={styles.secondaryButton}>
            <FontAwesomeIcon
              icon="phone"
              size={20}
              style={styles.callAdminImage}
            />
            <SecondaryButtonText>Call Admin</SecondaryButtonText>
          </SecondaryButton>
        )}
        {!props.hideAbandon && (
          <SecondaryButton onPress={abandon} style={styles.secondaryButton}>
            <FontAwesomeIcon
              icon="times"
              size={20}
              style={styles.abandonImage}
            />
            <SecondaryButtonText>Abandon</SecondaryButtonText>
          </SecondaryButton>
        )}
      </View>

      <View style={styles.separator} />
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eceff1',
    height: 2,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    height: 80,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  logo: {
    flex: 10,
    marginLeft: 20,
  },
  buttonAbandon: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 20,
  },
  buttonCall: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    color: '#4E5966',
    fontSize: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  callAdminImage: {
    color: '#4C5E7A',
    fontSize: 18,
    marginRight: 10,
  },
  abandonImage: {
    color: '#4C5E7A',
    fontSize: 18,
    marginRight: 10,
  },
  secondaryButton: {
    flexDirection: 'row',
  },
});

const mapStateToProps = ({auth}, props) => ({
  auth,
  props,
});

const mapDispatchToProps = dispatch => ({
  setLogin: data => dispatch(updateAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenContainer);
