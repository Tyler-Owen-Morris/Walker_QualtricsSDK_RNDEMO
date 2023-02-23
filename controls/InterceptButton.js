import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import Qualtrics from 'react-native-qualtrics';

function InterceptButton({auth, testIntercept, my_title, evalStatus}) {
  const [passed, setPassed] = useState(
    evalStatus[my_title] ? evalStatus[my_title].passed : false,
  );
  //const [surveyUrl, setSurveyUrl] = useState(evalStatus[my_title].surveyUrl);
  // const [creativeType, setCreativeType] = useState(
  //   evalStatus[my_title].creativeType,
  // );

  function displayInt() {
    if (passed) {
      Qualtrics.displayIntercept(my_title);
    } else {
      Alert.alert(
        'Intercept Evaluated to FALSE\nNot displaying Intercept',
        '',
        [
          {
            text: 'Dismiss',
            onPress: () => {
              console.log('Dismiss Pressed');
            },
          },
        ],
        {cancelable: false},
      );
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          //testIntercept(val);
          displayInt();
        }}
        style={styles.intContainer}>
        <Text style={styles.intButton}>{my_title}</Text>
        {passed ? (
          <FontAwesomeIcon
            icon="check-circle"
            size={20}
            style={styles.interceptPass}
          />
        ) : (
          <FontAwesomeIcon
            icon="times-circle"
            size={20}
            style={styles.interceptFail}
          />
        )}
        {/* <FontAwesomeIcon
          icon="arrow-right"
          size={22}
          style={styles.interceptPlay}
        /> */}
      </TouchableOpacity>
    </>
  );
}
const my_font = 'HelveticaNeue';
const styles = StyleSheet.create({
  intContainer: {
    backgroundColor: '#f7971e',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    color: 'white',
    borderRadius: 10,
    marginVertical: 8,
    height: 45,
  },
  interceptPass: {
    marginHorizontal: 20,
    color: 'green',
    paddingTop: 3,
  },
  interceptFail: {
    marginHorizontal: 20,
    color: 'red',
    paddingTop: 3,
  },
  interceptPlay: {
    marginRight: 8,
    color: 'white',
    paddingTop: 3,
  },
  intButton: {
    marginVertical: 5,
    fontFamily: my_font,
    color: 'white',
    fontSize: 18,
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

export default connect(mapStateToProps, mapDispatchToProps)(InterceptButton);
