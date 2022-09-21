import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import {
  SafeAreaView,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryTextInput,
} from '../controls/styles';
import CardView from '../controls/CardView';
import {connect} from 'react-redux';
import {updateAuth, updateVars} from '../redux/actions/authActions';
import Qualtrics from 'react-native-qualtrics';
import BottomHud from '../controls/BottomHud';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import QualtVar from '../controls/QualtVar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import WalkerLogoComponent from '../assets/Walker_Logo_JSX';
import QualtricsLogoComponent from '../assets/Qualtrics_logo_JSX';

function FirstIntercept({auth, setLogin, setCustomVars}) {
  const [interceptIDs, setInterceptIDs] = useState([]);
  const [customVars, setCVars] = useState(auth.custom_vars);

  useEffect(() => {
    console.log('intercept-auth:', auth);
    //console.log("custom_vars-int", custom_vars, customVars);
    if (auth.auth != null && typeof auth.auth.intercepts != 'undefined') {
      console.log('intercepts:', auth.auth.intercepts);
      let ret = [];
      for (const [key, value] of Object.entries(auth.auth.intercepts)) {
        console.log(`${key}: ${JSON.stringify(value)}`);
        ret.push(`${key}`);
      }
      setInterceptIDs(ret);
    } else {
      setInterceptIDs([]);
    }
  }, [auth.auth]);

  const resetCreds = () => {
    //console.log('resettingCreds');
    setLogin(null);
  };

  async function testIntercept(intId) {
    //setIsBusy(true);
    console.log('intId:', intId);
    console.log('auth:', auth);
    let myExRef = '';
    if (auth.creds.doExtRef) {
      myExRef = auth.auth.extRefID;
    }

    console.log('my exref:', myExRef);
    Qualtrics.initializeProjectWithExtRefId(
      auth.auth.brandID,
      auth.auth.projectID,
      myExRef,
      result => {
        console.log('result:', result);
        if (result.ERROR == null && Object.keys(result).length > 0) {
          console.log('Qualtrics Initilized!');
          //setIsBusy(false);
          setQualtricsVariables();
          Qualtrics.evaluateIntercept(intId, async res => {
            console.log('evalRes:', res);
            if (res.passed) {
              console.log('result:', res);
              var inter = await Qualtrics.displayIntercept(intId);
              console.log('inter:', inter);
            } else {
              console.log('intercept failed...');
              Alert.alert(
                'Intercept Evaluated to FALSE\nNot displaying Intercept',
                JSON.stringify(res),
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      //setIsBusy(false);
                      console.log('OK Pressed');
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          });
        } else {
          console.log('unable to re-init the project');
          Alert.alert(
            'Project was not able to reinitilize\nNo intercepts were evaluated',
            '',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {
                text: 'OK',
                onPress: () => {
                  //setIsBusy(false);
                  console.log('OK Pressed');
                },
              },
            ],
            {cancelable: false},
          );
        }
      },
    );
  }

  const setQualtricsVariables = () => {
    for (let i = 0; i < customVars.length; i++) {
      let cVal = customVars[i].value;
      let nme = customVars[i].name;
      if (nme == '') {
        continue;
      }
      let v = parseInt(cVal);
      let isNum = cVal.match(/^[-]{0,1}[0-9]*[.]{0,1}[0-9]*$/) != null;
      console.log('isnum:', isNum);
      //console.log('val:', cVal);
      //console.log('v', v);
      if (!isNum) {
        Qualtrics.setString(nme, cVal);
        console.log('set string:', cVal);
      } else {
        if (isNaN(v)) {
          Qualtrics.setNumber(nme, 0);
          console.log('set num:', 0);
        } else {
          Qualtrics.setNumber(nme, Number(cVal));
          console.log('set num:', cVal);
        }
      }
    }
  };

  function newVariable() {
    let newvars = [...customVars];
    newvars.push({key: customVars.length, name: '', value: ''});
    setCVars(newvars);
    setCustomVars(newvars);
  }

  function removeVariable(k) {
    let cur = [];
    let kei = 0;
    for (var i = 0; i < customVars.length; i++) {
      if (customVars[i].key != k) {
        cur.push({...customVars[i], key: kei});
        kei++;
      }
    }
    //console.log(">>>>>>> ", cur)
    setCVars(cur);
    setCustomVars(cur);
  }

  function updateCvarName(k, n, v, o) {
    // where k is position in DOM, n is var new name, v is var value, and o is old value - to be removed
    let result = [];
    for (var i = 0; i < customVars.length; i++) {
      //console.log('update cvar, name:', i, customVars[i].key, n, o);
      if (customVars[i].key == k) {
        let nObj = {
          key: customVars[i].key,
          name: n,
          value: customVars[i].value,
        };
        result.push(nObj);
      } else {
        //console.log('passing on ', k, n, v, o);
        result.push(customVars[i]);
      }
    }
    console.log('after Name Change array:', result);
    setCVars(result);
    setCustomVars(result);
  }

  function updateCvarValue(k, n, v) {
    // where k is posision in dom, n is var name, and v is new value
    let accum = [];
    for (var i = 0; i < customVars.length; i++) {
      if (customVars[i].key == k) {
        accum.push({
          key: customVars[i].key,
          name: customVars[i].name,
          value: v,
        });
      } else {
        accum.push({
          key: customVars[i].key,
          name: customVars[i].name,
          value: customVars[i].value,
        });
      }
    }
    console.log('after value change:', accum);
    setCVars(accum);
    setCustomVars(accum);
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#417cca'}}>
        {/* <Text style={styles.header}>Intercepts</Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <WalkerLogoComponent width="180" height="50" style={styles.Wlogo} />
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              marginLeft: 20,
              fontFamily: my_font,
            }}>
            Digitial CX {'\n'}Mobile Demo
          </Text>
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={{backgroundColor: 'white', height: '100%'}}>
            <ScrollView style={{height: '100%'}}>
              <CardView style={styles.card}>
                {interceptIDs.length == 0 ? (
                  <Text style={styles.interceptHeader}>
                    No intercepts have been initilized.
                  </Text>
                ) : (
                  <Text style={styles.interceptHeader}>
                    Available Intercepts
                  </Text>
                )}
                {interceptIDs.map((val, idx) => {
                  let my_title = val;
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {
                        testIntercept(val);
                      }}
                      style={styles.intContainer}>
                      {/* <Button
                        title={my_title}
                        style={styles.intButton}
                    color="white"></Button> */}
                      <Text style={styles.intButton}>{my_title}</Text>
                      <FontAwesomeIcon
                        icon="arrow-right"
                        size={22}
                        style={styles.interceptPlay}
                      />
                    </TouchableOpacity>
                  );
                })}
              </CardView>
              <View
                style={{
                  //borderWidth: 1,
                  borderColor: '#e9ecef',
                  //borderRadius: 10,
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#d3d3d3',
                    marginHorizontal: -10,
                    //borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={styles.interceptHeader}>
                    Qualtrics Variables:
                  </Text>
                  <TouchableOpacity
                    onPress={newVariable}
                    style={styles.touchablePlusContainer}>
                    <FontAwesomeIcon
                      icon="plus-circle"
                      size={30}
                      style={styles.interceptPlus}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: 5, marginBottom: 50}}>
                  {customVars.length > 0 ? (
                    customVars.map((val, idx) => {
                      console.log('creating variables:', idx);
                      return (
                        <QualtVar
                          input={val}
                          key={idx}
                          font={my_font}
                          changeValue={updateCvarValue}
                          changeName={updateCvarName}
                          removeVar={removeVariable}
                        />
                      );
                    })
                  ) : (
                    <TouchableOpacity onPress={newVariable}>
                      <Text
                        style={{
                          fontSize: 20,
                          alignSelf: 'center',
                          marginRight: 10,
                          margin: 10,
                          fontFamily: my_font,
                        }}>
                        No Custom Variables
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <CardView style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetCreds}>
          <View style={styles.resetContainer}>
            <FontAwesomeIcon
              icon="arrow-circle-left"
              size={22}
              style={styles.interceptPlay}
            />
            <Text style={styles.resetButton}>Reset Project</Text>
            {/* <Button
              style={styles.resetButton}
              title="Reset Project"
                      color="white"></Button> */}
          </View>
        </TouchableOpacity>
        {/*<Button title="RESET" onPress={resetCreds} style={styles.resetButton} />
        <BottomHud resetCreds={resetCreds} />
    <TouchableOpacity
      style={styles.helpContainer}
      onPress={() => {
        console.log('works');
      }}>
      <FontAwesomeIcon
        style={{color: '#417cca'}}
        icon="question-circle"
        size={20}></FontAwesomeIcon>
      <Text style={styles.helpText}>Help</Text>
    </TouchableOpacity> 
    <QualtricsLogoComponent style={styles.Qlogo} height="80" width="150" />
    */}
      </CardView>
    </>
  );
}

const my_font = 'HelveticaNeue';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 30,
    marginVertical: 12,
  },
  intContainer: {
    backgroundColor: '#f7971e',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    color: 'white',
    borderRadius: 10,
    marginVertical: 10,
    height: 45,
  },
  resetContainer: {
    backgroundColor: '#6a737c',
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    color: 'white',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 45,
  },
  interceptHeader: {
    fontSize: 22,
    margin: 10,
    alignSelf: 'center',
    fontFamily: my_font,
  },
  interceptPlus: {
    fontSize: 29,
    marginLeft: 20,
    alignSelf: 'center',
    marginBottom: 9,
    fontFamily: my_font,
    //color: 'blue',
  },
  interceptPlay: {
    marginRight: 8,
    color: 'white',
    paddingTop: 3,
  },
  touchablePlusContainer: {
    alignContent: 'center',
    //color: 'red',
    marginTop: 13,
  },
  card: {
    margin: 5,
  },
  intButton: {
    marginVertical: 5,
    fontFamily: my_font,
    color: 'white',
    fontSize: 18,
  },
  idText: {
    fontSize: 15,
    fontStyle: 'italic',
    fontFamily: my_font,
  },
  currLocText: {
    fontSize: 21,
    fontFamily: my_font,
  },
  inputLabel: {
    marginLeft: 12,
    fontSize: 11,
    marginBottom: 10,
    fontFamily: my_font,
  },
  resetButton: {
    //justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 17,
    //marginTop: -10,
    fontFamily: my_font,
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({auth, custom_vars}) => ({
  auth,
  custom_vars,
});

const mapDispatchToProps = dispatch => ({
  setLogin: data => dispatch(updateAuth(data)),
  setCustomVars: data => dispatch(updateVars(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstIntercept);
