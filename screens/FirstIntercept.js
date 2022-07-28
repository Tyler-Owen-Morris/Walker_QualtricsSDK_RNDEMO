import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
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
    console.log('resettingCreds');
    setLogin(null);
  };

  async function testIntercept(intId) {
    console.log('intId:', intId);
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
    });
  }

  const setQualtricsVariables = () => {
    for (let i = 0; i < customVars.length; i++) {
      let cVal = customVars[i].value;
      let nme = customVars[i].name;
      if (nme == '') {
        continue;
      }
      let v = parseInt(cVal);
      let isNum = cVal.match(/^[0-9]*$/) != null;
      console.log('isnum:', isNum);
      console.log('val:', cVal);
      console.log('v', v);
      if (!isNum) {
        Qualtrics.setString(nme, cVal);
        console.log('set strin:', cVal);
      } else {
        if (isNaN(v)) {
          Qualtrics.setNumber(nme, 0);
          console.log('set num:', 0);
        } else {
          Qualtrics.setNumber(nme, cVal);
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

  // function updateCurrentVars(k, n, v) {
  //   console.log('key:', k, ' value:', v, ' name:', n);
  //   let current = [];
  //   for (var i = 0; i < customVars.length; i++) {
  //     if (customVars[i].name == n) {
  //       let a = {
  //         key: k,
  //         name: n,
  //         value: v,
  //       };
  //       current.push(a);
  //     } else {
  //       current.push(customVars[i]);
  //     }
  //   }
  //   // set local state for viewing and update redux store
  //   setCVars(current);
  //   setCustomVars(current);
  // }

  function updateCvarName(k, n, v, o) {
    // where k is position in DOM, n is var new name, v is var value, and o is old value - to be removed
    let result = [];
    for (var i = 0; i < customVars.length; i++) {
      console.log('update cvar, name:', i, customVars[i].key, n, o);
      if (customVars[i].key == k) {
        let nObj = {
          key: customVars[i].key,
          name: n,
          value: customVars[i].value,
        };
        result.push(nObj);
      } else {
        console.log('passing on ', k, n, v, o);
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
    <SafeAreaView>
      <Text style={styles.header}>Intercepts</Text>
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <CardView style={styles.card}>
            {interceptIDs.length == 0 ? (
              <Text style={styles.interceptHeader}>
                No intercepts have been initilized.
              </Text>
            ) : (
              <Text style={styles.interceptHeader}>
                Click the intercept to test
              </Text>
            )}
            {interceptIDs.map((val, idx) => {
              return (
                <PrimaryButton
                  key={idx}
                  style={styles.intButton}
                  onPress={() => {
                    testIntercept(val);
                  }}>
                  <PrimaryButtonText>
                    Test: <Text style={styles.idText}>{val}</Text>
                  </PrimaryButtonText>
                </PrimaryButton>
              );
            })}
          </CardView>
          <CardView>
            <View
              style={{
                backgroundColor: '#d3d3d3',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text onPress={newVariable} style={styles.interceptPlus}>
                +
              </Text>
              <Text style={styles.interceptHeader}>Qualtrics Variables:</Text>
            </View>
            <View style={{marginTop: 10}}>
              {customVars.length > 0 ? (
                customVars.map((val, idx) => {
                  return (
                    <QualtVar
                      input={val}
                      key={idx}
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
                    }}>
                    No Custom Variables
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </CardView>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomHud resetCreds={resetCreds} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 30,
    marginVertical: 12,
  },
  interceptHeader: {
    fontSize: 19,
    margin: 10,
    alignSelf: 'center',
  },
  interceptPlus: {
    fontSize: 29,
    marginRight: 20,
    alignSelf: 'center',
  },
  card: {
    margin: 5,
  },
  intButton: {
    marginVertical: 5,
  },
  idText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  currLocText: {
    fontSize: 21,
  },
  inputLabel: {marginLeft: 12, fontSize: 11, marginBottom: 10},
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
