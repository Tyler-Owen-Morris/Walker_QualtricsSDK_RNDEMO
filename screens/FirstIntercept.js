import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import {
    SafeAreaView,
    TextInput,
    PrimaryButton,
    ImageLogo,
    PrimaryButtonText,
    PrimaryTextInput,
    Title,
    WelcomeText,
    WelcomeSecondaryText,
    QRLegend,
    QRContainer,
    QRCode,
    SeparatorContainer,
    Separator,
    PrimaryButtonAltText
} from '../controls/styles';
import CardView from '../controls/CardView';
import { connect } from 'react-redux';
import { updateAuth } from '../redux/actions/authActions';
import Qualtrics from 'react-native-qualtrics';
import BottomHud from '../controls/BottomHud';


function FirstIntercept({ auth, setLogin }) {
    const [interceptIDs, setInterceptIDs] = useState([]);
    const [currNav, setCurrNav] = useState('home');
    const [var1, setVar1] = useState('FOO');
    const [var2, setVar2] = useState(0);

    useEffect(() => {
        console.log("auth:", auth)
        if (auth != null) {
            console.log("intercepts:", auth.intercepts)
            let ret = []
            for (const [key, value] of Object.entries(auth.intercepts)) {
                console.log(`${key}: ${value}`);
                ret.push(`${key}`)
            }
            setInterceptIDs(ret);
        } else {
            setInterceptIDs([]);
        }
    }, [auth]);

    useEffect(() => {
        Qualtrics.setString('curr_nav', currNav);
        Qualtrics.setString('var1', var1);
        Qualtrics.setNumber('var2', var2);
    }, [currNav, var1, var2]);

    const resetCreds = () => {
        setLogin(null);
    }

    async function testIntercept(intId) {
        console.log("intId:", intId);
        Qualtrics.evaluateIntercept(intId, async res => {
            console.log("evalRes:", res);
            if (res.passed) {
                console.log('result:', res);
                var inter = await Qualtrics.displayIntercept(intId);
                console.log('inter:', inter);
            } else {
                console.log('intercept failed...');
                Alert.alert(
                    'Error',
                    res,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                //setIsBusy(false);
                            },
                        },
                    ],
                    { cancelable: false },
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

    return (
        <SafeAreaView>
            <CardView style={styles.card}>
                {interceptIDs.map((val, idx) => {
                    return (
                        <PrimaryButton style={styles.intButton} onPress={() => { testIntercept(val); }}>
                            <PrimaryButtonText>Test Intercept {val}</PrimaryButtonText>
                        </PrimaryButton>
                    )
                })}
                {/* <PrimaryButton onPress={resetCreds} style={{ marginTop: 20 }}>
                    <PrimaryButtonText>Reset Credentials</PrimaryButtonText>
                </PrimaryButton> */}
            </CardView>
            <CardView>
                <PrimaryTextInput
                    value={currNav}
                    placeholder="CurrentNavigation"
                    onChangeText={changeNavText}
                    autoCapitalize='none'
                />
                <PrimaryButton onPress={toggleVar1} >
                    <PrimaryButtonText>Toggle {var1}</PrimaryButtonText>
                </PrimaryButton>
                <PrimaryTextInput
                    value={var2}
                    placeholder="Var2"
                    onChangeText={changeNumeric}
                />
            </CardView>
            <BottomHud resetCreds={resetCreds} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 5
    },
    intButton: {
        marginVertical: 5
    }
});

const mapStateToProps = ({ auth }) => ({
    auth,
});

const mapDispatchToProps = dispatch => ({
    setLogin: data => dispatch(updateAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstIntercept);