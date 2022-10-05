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
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  updateAuth,
  updateCreds,
  updateVars,
} from '../redux/actions/authActions';
import Spinner from 'react-native-loading-spinner-overlay';
import Qualtrics from 'react-native-qualtrics';
import {SafeAreaView} from '../controls/styles';
import CardView from '../controls/CardView';
import WalkerLogoComponent from '../assets/Walker_Logo_JSX';
import QualtricsLogoComponent from '../assets/Qualtrics_logo_JSX';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

function WelcomeScreen({auth, setLogin, setCreds, setVars}) {
  const [isBusy, setIsBusy] = useState(false);
  const [brandID, setBrandID] = useState(auth.creds.brandID);
  const [projectID, setProjectID] = useState(auth.creds.projectID);
  const [extRefID, setExtRefID] = useState(auth.creds.extRefID);
  const [doExtRef, toggleExtRef] = useState(auth.creds.doExtRef);
  const [keyboarAvoidEnable, toggleKeyboardAvoid] = useState(true);
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
    console.log('exref text change:', text);
    setExtRefID(text);
  }

  async function initilizeQualt() {
    //console.log('init goes here.', brandID, projectID);
    setIsBusy(true);

    if (doExtRef) {
      console.log('brand:', brandID, ' proj:', projectID, 'extRef:', extRefID);
      let safeExtRef = '';
      if (typeof extRefID !== 'undefined') {
        safeExtRef = extRefID;
      }
      Qualtrics.initializeProjectWithExtRefId(
        brandID,
        projectID,
        safeExtRef,
        result => {
          console.log('result:', result);
          if (result.ERROR == null && Object.keys(result).length > 0) {
            console.log('Qualtrics Initilized!');
            setLogin({
              brandID: brandID,
              projectID: projectID,
              extRefID: safeExtRef,
              intercepts: result,
            });
            setCreds({
              brandID: brandID,
              projectID: projectID,
              extRefID: safeExtRef,
              doExtRef: true,
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
      let safeExtRef = '';
      if (typeof extRefID !== 'undefined') {
        safeExtRef = extRefID;
      }
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
            extRefID: safeExtRef,
            doExtRef: false,
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

  const disableKeyboardView = () => {
    console.log('disable keyboard avoiding');
    toggleKeyboardAvoid(false);
  };

  const enableKeyboardView = () => {
    console.log('enable keyboard avoiding');
    toggleKeyboardAvoid(true);
  };

  const openWalkerHelp = () => {
    Linking.openURL(walkerURL);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          backgroundColor: '#417cca',
          height: 50,
          //backgroundColor: 'red',
          position: 'absolute',
          width: '110%',
        }}></View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        enabled={keyboarAvoidEnable}
        behavior="padding">
        <Spinner visible={isBusy} textContent={''} />
        <TouchableOpacity
          style={styles.touchableOpac}
          onPress={() => {
            Keyboard.dismiss();
            disableKeyboardView();
          }}
          activeOpacity={1}>
          <View style={styles.header}>
            <WalkerLogoComponent
              width="300"
              height="53"
              style={styles.walkerLogo}
            />
            <Text style={styles.subHeader}>Digital CX Mobile Demo</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.inputHeader}>BrandID:</Text>
            <TextInput
              style={styles.textInput}
              value={brandID}
              placeholder="Brand ID"
              placeholderTextColor="#adb5bd"
              onChangeText={brandTextChange}
              onPressIn={enableKeyboardView}
              autoCapitalize="none"
            />
            <Text style={styles.inputHeader}>ProjectID:</Text>
            <TextInput
              style={styles.textInput}
              value={projectID}
              placeholder="Project ID"
              placeholderTextColor="#adb5bd"
              onChangeText={projectTextChange}
              onPressIn={enableKeyboardView}
              autoCapitalize="none"
            />
            <View style={styles.exRefContainer}>
              <Switch
                trackColor={{false: '#548ab4', true: '#81b2fc'}}
                value={doExtRef}
                onValueChange={doExtRefValChange}
              />
              <Text style={styles.exRefText}>
                Initilize with External Data Reference
              </Text>
            </View>
            {doExtRef ? (
              <>
                <Text style={styles.inputHeader}>External Reference ID:</Text>
                <TextInput
                  style={styles.textInput}
                  value={extRefID}
                  autoCapitalize="none"
                  placeholder="External Reference ID"
                  placholderTextColor="#adb5bd"
                  onChangeText={extRefTextChange}
                  onPressIn={enableKeyboardView}
                />
              </>
            ) : (
              <></>
            )}
            <TouchableOpacity style={styles.initBtn} onPress={initilizeQualt}>
              <View style={styles.initBtnContent}>
                <Text style={styles.initBtnTxt}>Load Project</Text>
                <FontAwesomeIcon
                  icon="arrow-right"
                  size={22}
                  style={styles.initBtnIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.helpContainer} onPress={openWalkerHelp}>
          <FontAwesomeIcon
            icon="question-circle"
            size={20}
            style={{color: '#417cca'}}></FontAwesomeIcon>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
        <QualtricsLogoComponent style={styles.qLogo} height="80" width="150" />
      </View>
    </SafeAreaView>
  );
}

const my_font = 'HelveticaNeue';

const styles = StyleSheet.create({
  safeAreaView: {
    //flex: 1,
    //backgroundColor: '#417cca',
  },
  keyboardAvoidingView: {
    flexDirection: 'column',
    flex: 1,
  },
  touchableOpac: {
    flex: 1,
  },
  header: {
    backgroundColor: '#417cca',
    alignItems: 'center',
    flex: 1,
  },
  walkerLogo: {
    marginVertical: 5,
  },
  subHeader: {
    marginBottom: 10,
    marginTop: 5,
    fontSize: 20,
    color: 'white',
    fontFamily: my_font,
  },
  body: {
    backgroundColor: 'white',
    paddingBottom: 0,
    flex: 5,
  },
  inputHeader: {
    marginLeft: 18,
    fontSize: 19,
    fontWeight: 'normal',
    marginTop: 5,
    fontFamily: my_font,
  },
  textInput: {
    marginTop: 10,
    margin: 10,
    height: 45,
    borderWidth: 0.0,
    borderRadius: 10,
    padding: 7,
    fontSize: 16,
    backgroundColor: '#f4f8fb',
    fontFamily: my_font,
  },
  exRefContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 17,
  },
  exRefText: {
    marginLeft: 15,
    fontFamily: my_font,
  },
  initBtn: {
    marginTop: 2,
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 1000,
    height: 50,
    fontSize: 5,
    backgroundColor: '#f7971e',
    borderRadius: 10,
    color: '#548ab4',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  initBtnContent: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  initBtnTxt: {
    fontSize: 20,
    marginHorizontal: 10,
    color: 'white',
    fontFamily: my_font,
  },
  initBtnIcon: {
    color: 'white',
  },
  footer: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 10,
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 10,
  },
  helpText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#417cca',
  },
  qLogo: {
    marginTop: -10,
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
