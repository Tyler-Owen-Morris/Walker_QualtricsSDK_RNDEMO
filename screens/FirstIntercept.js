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
        //console.log("auth:", auth)
        if (auth != null) {
            //console.log("intercepts:", auth.intercepts)
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
            <Text style={styles.header} >Intercepts</Text>
            <CardView style={styles.card}>
                <Text style={styles.intHeader} >Click the intercept to test</Text>
                {interceptIDs.map((val, idx) => {
                    return (
                        <PrimaryButton style={styles.intButton} onPress={() => { testIntercept(val); }}>
                            <PrimaryButtonText>Test: <Text style={styles.idText} >{val}</Text></PrimaryButtonText>
                        </PrimaryButton>
                    )
                })}

            </CardView>
            <CardView>
                <Text style={styles.intHeader} >Qualtrics Variables:</Text>
                <PrimaryTextInput
                    value={currNav}
                    placeholder="CurrentNavigation"
                    onChangeText={changeNavText}
                    autoCapitalize='none'
                    style={styles.currLocText}
                />
                <Text style={styles.inputLabel} >Current Navigation: {currNav}</Text>
                <PrimaryButton style={styles.intButton} onPress={toggleVar1} >
                    <PrimaryButtonText>Toggle {var1}</PrimaryButtonText>
                </PrimaryButton>
                <Text style={styles.inputLabel} >Value 1: {var1}</Text>
                <PrimaryTextInput
                    value={var2}
                    placeholder="Var2"
                    onChangeText={changeNumeric}
                />
                <Text style={styles.inputLabel} >Value 2: {var2}</Text>
            </CardView>
            <BottomHud resetCreds={resetCreds} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        fontSize: 30,
        marginVertical: 12
    },
    intHeader: {
        fontSize: 19,
        marginBottom: 10,
        alignSelf: 'center'
    },
    card: {
        margin: 5
    },
    intButton: {
        marginVertical: 5
    },
    idText: {
        fontSize: 13,
        fontStyle: 'italic'
    },
    currLocText: {
        fontSize: 21
    },
    inputLabel: { marginLeft: 12, fontSize: 11, marginBottom: 10 }
});

const mapStateToProps = ({ auth }) => ({
    auth,
});

const mapDispatchToProps = dispatch => ({
    setLogin: data => dispatch(updateAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstIntercept);