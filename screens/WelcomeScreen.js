import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { updateAuth } from '../redux/actions/authActions';
import Spinner from 'react-native-loading-spinner-overlay';
import Qualtrics from 'react-native-qualtrics';

import {
  SafeAreaView,
  TextInput,
  PrimaryButton,
  ImageLogo,
  PrimaryButtonText,
  PrimaryTextInput,
} from '../controls/styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CardView from '../controls/CardView';

function WelcomeScreen({ auth, setLogin }) {
  const [isBusy, setIsBusy] = useState(false);
  const [brandID, setBrandID] = useState('walkersandbox');
  const [projectID, setProjectID] = useState('ZN_9XhdWiyfHvNt0ai');
  const navigation = useNavigation();

  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);


  function brandTextChange(text) {
    setBrandID(text);
  }

  function projectTextChange(text) {
    setProjectID(text);
  }

  async function initilizeQualt() {
    //console.log('init goes here.', brandID, projectID);
    setIsBusy(false);
    Qualtrics.initializeProject(brandID, projectID, result => {
      //console.log('result:', result);
      if (result.ERROR == null) {
        console.log('Qualtrics Initilized!');
        setLogin({
          brandID: brandID,
          projectID: projectID,
          intercepts: result,
        });
        setIsBusy(false);
      } else {
        Alert.alert(
          'Error',
          result.ERROR.message,
          [
            {
              text: 'OK',
              onPress: () => {
                setIsBusy(false);
              },
            },
          ],
          { cancelable: false },
        );
      }
    });
  }

  const resetCredentials = () => {
    //navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView>
      <Spinner visible={isBusy} textContent={''} />
      <CardView style={styles.card}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/Walker.png')} />
          <Image
            source={require('../assets/qualtrics2.png')}
            resizeMethod="scale"
          />
          <Text style={{ alignSelf: 'center', marginBottom: 10 }}>
            React Native 2.0.0 SDK Demo
          </Text>
        </View>
        <Text style={styles.header}>Input Your Project Credendials:</Text>
        <PrimaryTextInput
          style={styles.input}
          value={brandID}
          placeholder="Brand ID"
          placholderTextColor="#adb5bd"
          onChangeText={brandTextChange}
        />
        <Text style={{ marginLeft: 18, fontSize: 9, marginTop: -5 }}>
          Brand ID
        </Text>
        <PrimaryTextInput
          style={styles.input}
          value={projectID}
          placeholder="Project ID"
          placholderTextColor="#adb5bd"
          onChangeText={projectTextChange}
        />
        <Text style={{ marginLeft: 18, fontSize: 9, marginTop: -5 }}>
          Project ID
        </Text>
        <PrimaryButton onPress={initilizeQualt} style={{ marginTop: 20 }}>
          <PrimaryButtonText>Initilize Project</PrimaryButtonText>
        </PrimaryButton>
      </CardView>
    </SafeAreaView>
    // <SafeAreaView>
    //   <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut}>
    //     <ImageLogo source={require('../assets/timbergrove_logo.png')} />
    //   </TouchableWithoutFeedback>
    //   <Title>
    //     <WelcomeText>Welcome</WelcomeText>
    //     <WelcomeSecondaryText> to our building</WelcomeSecondaryText>
    //   </Title>
    //   <CardView>
    //     <View>
    //       <QRLegend>
    //         Scan the QR code to check in using your cell phone
    //       </QRLegend>
    //       <QRContainer>
    //         <QRCode source={require('../assets/qr_code.png')} />
    //       </QRContainer>
    //     </View>
    //     <SeparatorContainer>
    //       <Separator />
    //     </SeparatorContainer>
    //     <PrimaryButton onPress={goToPrescreen} style={{marginTop: 20}}>
    //       <PrimaryButtonText>Prescreen Checkin here</PrimaryButtonText>
    //     </PrimaryButton>
    //     <PrimaryButton onPress={goToNextScreen} style={{marginTop: 20}}>
    //       <PrimaryButtonText>Otherwise check in here</PrimaryButtonText>
    //     </PrimaryButton>
    //      <PrimaryButton onPress={openQR} style={{marginTop: 20}}>
    //       <PrimaryButtonText>QR Provisioning</PrimaryButtonText>
    //     </PrimaryButton> 
    //   </CardView>
    //   <CardView>
    //     <Text>You are logged in/initilized</Text>
    //     <PrimaryButton>
    //       <PrimaryButtonText onPress={resetCredentials}>
    //         Reset Project
    //       </PrimaryButtonText>
    //     </PrimaryButton>
    //   </CardView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {},
  logo: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  card: {
    marginTop: 15,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#ff00ff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
    margin: 5,
    fontWeight: 'bold',
  },
  input: {
    margin: 10,
  },
});

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = dispatch => ({
  setLogin: data => dispatch(updateAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
