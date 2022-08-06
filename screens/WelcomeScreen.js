import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Switch,
  Linking,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import {
  updateAuth,
  updateCreds,
  updateVars,
} from '../redux/actions/authActions';
import Spinner from 'react-native-loading-spinner-overlay';
import Qualtrics from 'react-native-qualtrics';

import {
  SafeAreaView,
  TextInput,
  PrimaryButton,
  ImageLogo,
  PrimaryButtonText,
  PrimaryTextInput,
  SecondaryButton,
  SecondaryButtonText,
} from '../controls/styles';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import CardView from '../controls/CardView';
import WalkerLogoComponent from '../assets/Walker_Logo_JSX';
import QualtricsLogoComponent from '../assets/Qualtrics_logo_JSX';

function WelcomeScreen({auth, setLogin, setCreds, setVars}) {
  const [isBusy, setIsBusy] = useState(false);
  const [brandID, setBrandID] = useState(auth.creds.brandID);
  const [projectID, setProjectID] = useState(auth.creds.projectID);
  const [extRefID, setExtRefID] = useState(auth.creds.extRefID);
  const [doExtRef, toggleExtRef] = useState(true);
  const navigation = useNavigation();
  const walkerURL = 'https://walkerinfo.com/resources/';

  useEffect(() => {
    //console.log("WelcomeAuth", auth);
    //console.log("creds--", auth.creds);
  }, [auth.auth, auth.creds]);

  function brandTextChange(text) {
    setBrandID(text);
  }

  function projectTextChange(text) {
    setProjectID(text);
  }

  function extRefTextChange(text) {
    setExtRefID(text);
  }

  async function initilizeQualt() {
    //console.log('init goes here.', brandID, projectID);
    setIsBusy(true);

    if (doExtRef) {
      console.log('brand:', brandID, ' proj:', projectID, 'extRef:', extRefID);
      Qualtrics.initializeProjectWithExtRefId(
        brandID,
        projectID,
        extRefID,
        result => {
          console.log('result:', result);
          if (result.ERROR == null && Object.keys(result).length > 0) {
            console.log('Qualtrics Initilized!');
            setLogin({
              brandID: brandID,
              projectID: projectID,
              extRefID: extRefID,
              intercepts: result,
            });
            setCreds({
              brandID: brandID,
              projectID: projectID,
              extRefID: extRefID,
            });
            setIsBusy(false);
          } else {
            let msg = '';
            if (result.ERROR == null) {
              msg =
                'There was a problem logging in. Please check your credentials';
            } else {
              msg = result.ERROR.message;
            }
            Alert.alert(
              'Failed To Initilize',
              msg + '\nResult:' + JSON.stringify(result),
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setIsBusy(false);
                  },
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    } else {
      Qualtrics.initializeProject(brandID, projectID, result => {
        console.log('result:', result);
        if (result.ERROR == null && Object.keys(result).length > 0) {
          console.log('Qualtrics Initilized!');
          setLogin({
            brandID: brandID,
            projectID: projectID,
            intercepts: result,
          });
          setCreds({
            brandID: brandID,
            projectID: projectID,
          });
          setIsBusy(false);
        } else {
          let msg = '';
          console.log('failed result:', result);
          if (result.ERROR == null) {
            msg =
              'There was a problem logging in. Please check your credentials';
          } else {
            msg = result.ERROR.message;
          }
          Alert.alert(
            'Failed To Initilize',
            msg + '\nResult : ' + JSON.stringify(result),
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsBusy(false);
                },
              },
            ],
            {cancelable: false},
          );
        }
      });
    }
  }

  const doExtRefValChange = () => {
    toggleExtRef(!doExtRef);
  };

  const openWalkerHelp = () => {
    Linking.openURL(walkerURL);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <Spinner visible={isBusy} textContent={'loading...'} />
          <CardView style={styles.card}>
            <View style={styles.logoContainer}>
              <WalkerLogoComponent
                width="280"
                height="50"
                style={styles.Wlogo}
              />
              {/* <Image
                style={styles.Wlogo}
                resizeMethod="scale"
                source={require('../assets/Walker_Logo.png')}
              />
              <Image
                source={require('../assets/qualtrics3.png')}
                resizeMethod="scale"
                style={styles.Qlogo}
  /> */}
              <Text style={styles.subHeader}>
                Qualtrics React Native 2.3.0 SDK Demo
              </Text>
            </View>
            <View style={styles.helpTextContainer}>
              <Text style={styles.helpText}>
                For more detailed instructions see
              </Text>
              <Text style={styles.helpTextLink} onPress={openWalkerHelp}>
                the Walker Help Page
              </Text>
            </View>
            <Text style={styles.header}>Input Your Project Credendials:</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
              }}>
              <Text style={{marginRight: 15}}>
                Initilize with External Data Reference
              </Text>
              <Switch
                trackColor={{false: '#548ab4', true: '#d1dfea'}}
                value={doExtRef}
                onValueChange={doExtRefValChange}
              />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Brand ID</Text>
              <PrimaryTextInput
                style={styles.input}
                value={brandID}
                placeholder="Brand ID"
                placholderTextColor="#adb5bd"
                onChangeText={brandTextChange}
                autoCapitalize="none"
              />
              <Text style={styles.inputTitleText}>Project ID</Text>
              <PrimaryTextInput
                style={styles.input}
                value={projectID}
                autoCapitalize="none"
                placeholder="Project ID"
                placholderTextColor="#adb5bd"
                onChangeText={projectTextChange}
              />
              {doExtRef ? (
                <>
                  <Text style={styles.inputTitleText}>ExtRef ID</Text>
                  <PrimaryTextInput
                    style={styles.input}
                    value={extRefID}
                    autoCapitalize="none"
                    placeholder="External Reference ID"
                    placholderTextColor="#adb5bd"
                    onChangeText={extRefTextChange}
                  />
                </>
              ) : (
                <></>
              )}
            </View>
          </CardView>
        </ScrollView>
        <View style={styles.initBtn}>
          <Button
            title="Initilize Project"
            onPress={initilizeQualt}
            color="#d1dfea"></Button>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <QualtricsLogoComponent style={styles.Qlogo} height="80" width="150" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {},
  Wlogo: {
    alignSelf: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  Qlogo: {
    alignSelf: 'center',
    alignContent: 'center',
    //marginVertical: 5,
    //marginTop: 12,
  },
  subHeader: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  helpTextContainer: {
    alignContent: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  helpText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  helpTextLink: {
    alignSelf: 'center',
    color: '#548ab4',
    fontSize: 20,
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
    marginVertical: 15,
    paddingBottom: 20,
    margin: 5,
    fontWeight: 'bold',
    textShadowRadius: 0.5,
    textShadowColor: 'black',
  },
  input: {
    margin: 10,
  },
  inputTitleText: {
    marginLeft: 18,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 0,
    paddingTop: 8,
  },
  initBtn: {
    marginTop: 5,
    marginHorizontal: 15,
    fontSize: 50,
    backgroundColor: '#548ab4',
    borderRadius: 10,
    color: '#548ab4',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    alignContent: 'center',
  },
});

const mapStateToProps = ({auth, creds, custom_vars}) => ({
  auth,
  creds,
  custom_vars,
});

const mapDispatchToProps = dispatch => ({
  setLogin: data => dispatch(updateAuth(data)),
  setCreds: data => dispatch(updateCreds(data)),
  setVars: data => dispatch(updateVars(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
