import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Alert, View} from 'react-native';
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
  const [currNav, setCurrNav] = useState('home');
  const [var1, setVar1] = useState('FOO');
  const [var2, setVar2] = useState(0);

  useEffect(() => {
    console.log('intercept-auth:', auth);
    //console.log("custom_vars-int", custom_vars, customVars);
    if (auth.auth != null && typeof auth.auth.intercepts != 'undefined') {
      //console.log("intercepts:", auth.intercepts)
      let ret = [];
      for (const [key, value] of Object.entries(auth.auth.intercepts)) {
        //console.log(`${key}: ${value}`);
        ret.push(`${key}`);
      }
      setInterceptIDs(ret);
    } else {
      setInterceptIDs([]);
    }
  }, [auth.auth]);

  // useEffect(() => {
  //     Qualtrics.setString('screen_name', currNav);
  //     Qualtrics.setString('locale', var1);
  //     Qualtrics.setNumber('random_number', var2);
  // }, [currNav, var1, var2]);
  // useEffect(() => {
  //     setCVars(auth.custom_vars)
  // }, [auth.custom_vars]);

  const resetCreds = () => {
    console.log('resettingCreds');
    setLogin(null);
  };

  async function testIntercept(intId) {
    console.log('intId:', intId);
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
          res,
          [
            {
              text: 'OK',
              onPress: () => {
                //setIsBusy(false);
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  }

  function changeNavText(textIn) {
    setCurrNav(textIn);
  }

  function changeNumeric(strIn) {
    var midl = strIn.replace(/\D/g, '');
    var ret = parseFloat(midl);
    setVar2(ret);
  }

  function toggleVar1() {
    if (var1 == 'FOO') {
      setVar1('BAR');
    } else {
      setVar1('FOO');
    }
  }

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
    setCustomVars(cur);
    setCVars(cur);
  }

  function updateCurrentVars(k, n, v) {
    let current = [];
    for (var i = 0; i < customVars.length; i++) {
      if (customVars[i].key == k) {
        let a = {
          key: k,
          name: n,
          value: v,
        };
        current.push(a);
      } else {
        current.push(customVars[i]);
      }
    }
    // set local state for viewing and update redux store
    setCustomVars(current);
    setCVars(current);
  }

  return (
    <SafeAreaView>
      <Text style={styles.header}>Intercepts</Text>
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
                    changeValue={updateCurrentVars}
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
