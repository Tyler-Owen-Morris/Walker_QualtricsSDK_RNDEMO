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
  Dimensions,
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
<<<<<<< HEAD
import {ScrollView} from 'react-native-gesture-handler';
=======
import {useAnalytics} from '@segment/analytics-react-native';
>>>>>>> master

function WelcomeScreen({auth, setLogin, setCreds, setVars}) {
  const [isBusy, setIsBusy] = useState(false);
  const [brandID, setBrandID] = useState(auth.creds.brandID);
  const [projectID, setProjectID] = useState(auth.creds.projectID);
  const [extRefID, setExtRefID] = useState(auth.creds.extRefID);
  const [doExtRef, toggleExtRef] = useState(auth.creds.doExtRef);
  const [keyboardAvoidActive, setKeyboardAvoidActive] = useState(true);
  const [customMargin, setCustomMargin] = useState(10);
  const [qLogoDims, setQLogoDims] = useState({w: '150', h: '50'});
  const navigation = useNavigation();
  const walkerURL = 'https://walkerinfo.com/demo/DX/mobile-app';
<<<<<<< HEAD
=======
  const {track} = useAnalytics();
>>>>>>> master

  useEffect(() => {
    //console.log("WelcomeAuth", auth);
    //console.log("creds--", auth.creds);
  }, [auth.auth, auth.creds]);

  useEffect(() => {
    const s_height = Dimensions.get('window').height;
    const s_width = Dimensions.get('window').width;
    const div_height = 614;
    let diff = 10;
    if (s_height > div_height) {
      diff = s_height - div_height;
    }
    setCustomMargin(diff);
    // let l_wid = s_width / 3;
    // let l_heit = s_height / 6;
    // setQLogoDims({w: l_wid, h: l_heit});
  }, []);

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

  async function InitializeQualt() {
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
            console.log('Qualtrics Initialized!');
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
            // Segment Analyitics
            track('Init Success', {
              brandID,
              projectID,
              extRefID,
            });
          } else {
            let msg = '';
            if (result.ERROR == null) {
              msg =
                'There was a problem logging in. Please check your credentials';
            } else {
              msg = result.ERROR.message;
            }
            // Segment Analyitics
            track('Init Failed', {
              brandID,
              projectID,
              extRefID: '',
              errorMessage: msg,
            });
            Alert.alert(
              'Failed To Initialize',
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
          console.log('Qualtrics Initialized!');
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
          // Segment Analyitics
          track('Init Success', {
            brandID,
            projectID,
            extRefID: '',
          });
        } else {
          let msg = '';
          console.log('failed result:', result);
          if (result.ERROR == null) {
            msg =
              'There was a problem logging in. Please check your credentials';
          } else {
            msg = result.ERROR.message;
          }
          // Segment Analyitics
          track('Init Failed', {
            brandID,
            projectID,
            extRefID: '',
            errorMessage: msg,
          });
          Alert.alert(
            'Failed To Initialize',
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

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    console.log('my div height', height);
    const heit = Dimensions.get('window').height;
    console.log('screen height:', heit);
    let diff = heit - height;
    console.log('difference:', diff);
    if (customMargin != diff) {
      //setCustomMargin(diff);
    }
  };

  const styleFunction = opts => {
    console.log('style func called:', customMargin);
    return {
      marginTop: 5,
      marginHorizontal: 10,
      marginBottom: customMargin,
      height: 50,
      fontSize: 5,
      backgroundColor: '#f7971e',
      borderRadius: 10,
      color: '#548ab4',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };
  };

  const enableKeyboardAvoid = () => {
    console.log('enable keyboard avoiding');
    setKeyboardAvoidActive(true);
  };

  const disableKeyboardAvoid = () => {
    console.log('dismiss keyboard avoiding');
    setKeyboardAvoidActive(false);
  };

  const pressOutsideTxtInput = () => {
    Keyboard.dismiss();
    disableKeyboardAvoid();
  };

  const openWalkerHelp = () => {
    Linking.openURL(walkerURL);
  };

  return (
    <>
<<<<<<< HEAD
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{backgroundColor: '#417cca'}}
          onPress={pressOutsideTxtInput}
          activeOpacity={1}>
          <WalkerLogoComponent width="300" height="53" style={styles.Wlogo} />
          <Text style={styles.subHeader}>Digital CX Mobile Utility</Text>
        </TouchableOpacity>
        <ScrollView style={{flexGrow: 0}} onLayout={onLayout} vertical={true}>
          <TouchableOpacity onPress={pressOutsideTxtInput} activeOpacity={1}>
            <Spinner visible={isBusy} textContent={''} />
            <KeyboardAvoidingView
              style={{backgroundColor: '#417cca'}}
              behavior="padding"
              enabled={keyboardAvoidActive}>
              <CardView style={styles.card}>
                <Text style={styles.inputTitleText}>Brand ID:</Text>
                <TextInput
                  style={styles.input}
                  value={brandID}
                  placeholder="Brand ID"
                  placholderTextColor="#adb5bd"
                  onChangeText={brandTextChange}
                  onFocus={enableKeyboardAvoid}
                  onBlur={pressOutsideTxtInput}
                  autoCapitalize="none"
                />
                <Text style={styles.inputTitleText}>Project ID:</Text>
                <TextInput
                  style={styles.input}
                  value={projectID}
                  autoCapitalize="none"
                  placeholder="Project ID"
                  placholderTextColor="#adb5bd"
                  onChangeText={projectTextChange}
                  onFocus={enableKeyboardAvoid}
                  onBlur={pressOutsideTxtInput}
                />
                <View style={styles.toggleInput}>
                  <Switch
                    trackColor={{false: '#548ab4', true: '#81b2fc'}}
                    value={doExtRef}
                    onValueChange={doExtRefValChange}
=======
      <SafeAreaView style={{flex: 1, backgroundColor: '#417cca'}}>
        <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
          <WalkerLogoComponent width="300" height="53" style={styles.Wlogo} />
          <Text style={styles.subHeader}>Digital CX Mobile Utility</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
          <Spinner visible={isBusy} textContent={''} />
          <KeyboardAvoidingView
            style={{backgroundColor: '#417cca'}}
            behavior="padding">
            <CardView style={styles.card}>
              <Text style={styles.inputTitleText}>Brand ID:</Text>
              <TextInput
                style={styles.input}
                value={brandID}
                placeholder="Brand ID"
                placholderTextColor="#adb5bd"
                onChangeText={brandTextChange}
                autoCapitalize="none"
              />
              <Text style={styles.inputTitleText}>Project ID:</Text>
              <TextInput
                style={styles.input}
                value={projectID}
                autoCapitalize="none"
                placeholder="Project ID"
                placholderTextColor="#adb5bd"
                onChangeText={projectTextChange}
              />
              <View style={styles.toggleInput}>
                <Switch
                  trackColor={{false: '#548ab4', true: '#81b2fc'}}
                  value={doExtRef}
                  onValueChange={doExtRefValChange}
                />
                <Text style={{marginLeft: 15, fontFamily: my_font}}>
                  Initialize with External Data Reference
                </Text>
              </View>
              {doExtRef ? (
                <>
                  <Text style={styles.inputTitleText}>
                    External Reference ID:
                  </Text>
                  <TextInput
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
              <TouchableOpacity
                style={styles.initBtn}
                onPress={InitializeQualt}>
                <View style={styles.initBtnContent}>
                  <Text style={styles.initBtnTxt}>Load Project</Text>
                  <FontAwesomeIcon
                    icon="arrow-right"
                    size={22}
                    style={styles.initBtnIcon}
>>>>>>> master
                  />
                  <Text style={{marginLeft: 15, fontFamily: my_font}}>
                    Initilize with External Data Reference
                  </Text>
                </View>
                {doExtRef ? (
                  <>
                    <Text style={styles.inputTitleText}>
                      External Reference ID:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={extRefID}
                      autoCapitalize="none"
                      placeholder="External Reference ID"
                      placholderTextColor="#adb5bd"
                      onChangeText={extRefTextChange}
                      onFocus={enableKeyboardAvoid}
                      onBlur={pressOutsideTxtInput}
                    />
                  </>
                ) : (
                  <></>
                )}
                <TouchableOpacity
                  style={styleFunction()}
                  onPress={initilizeQualt}>
                  <View style={styles.initBtnContent}>
                    <Text style={styles.initBtnTxt}>Load Project</Text>
                    <FontAwesomeIcon
                      icon="arrow-right"
                      size={22}
                      style={styles.initBtnIcon}
                    />
                  </View>
                </TouchableOpacity>
              </CardView>
            </KeyboardAvoidingView>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <CardView style={styles.footer}>
        <TouchableOpacity style={styles.helpContainer} onPress={openWalkerHelp}>
          <FontAwesomeIcon
            style={{color: '#417cca'}}
            icon="question-circle"
            size={20}></FontAwesomeIcon>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
<<<<<<< HEAD
        <QualtricsLogoComponent
          style={styles.Qlogo}
          height={qLogoDims.h}
          width={qLogoDims.w}
        />
=======
        <QualtricsLogoComponent style={styles.Qlogo} height="60" width="150" />
>>>>>>> master
      </CardView>
    </>
  );
}

const my_font = 'HelveticaNeue';

const styles = StyleSheet.create({
  logoContainer: {},
  Wlogo: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginRight: 0,
  },
  Qlogo: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  subHeader: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 5,
    fontSize: 20,
    color: 'white',
    fontFamily: my_font,
  },
  helpTextContainer: {
    alignContent: 'center',
    //marginVertical: 10,
    //marginTop: 0,
  },
  helpText: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: my_font,
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
    padding: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 20,
    paddingBottom: 20,
    margin: 5,
    fontWeight: 'bold',
    textShadowRadius: 0.5,
    textShadowColor: 'black',
  },
  input: {
    marginTop: 6,
    margin: 10,
    height: 45,
    borderWidth: 0.0,
    borderRadius: 10,
    padding: 7,
    fontSize: 16,
    backgroundColor: '#f4f8fb',
    fontFamily: my_font,
  },
  inputTitleText: {
    marginLeft: 18,
    fontSize: 19,
    fontWeight: 'normal',
    marginTop: 0,
    fontFamily: my_font,
  },
  toggleInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  initBtn: {
    marginTop: 5,
    marginHorizontal: 10,
<<<<<<< HEAD
    marginBottom: 10,
=======
    marginBottom: 1800,
>>>>>>> master
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
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: -8,
  },
  helpText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#417cca',
  },
  footer: {
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
  },
  Qlogo: {
    alignSelf: 'center',
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
