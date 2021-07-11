import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';

import TakePictureButton from './TakePictureButton';
import {useNavigation} from '@react-navigation/native';
import TouchlessScroller from './TouchlessScroller';

import {onUploadPicture} from '../api/api';

function CameraView({auth, props, uploadPicture}) {
  return (
    <View style={styles.container}>
      {/* {!hasTakenPicture ? (
        <>
          {navigation.isFocused() ? (
            <RNCamera
              type={'front'}
              onFaceDetectionError={faceDectectionError}
              onFacesDetected={handleFaceDetected}
              style={styles.scanner}
              ref={(c) => setCamera(c)}
            />
          ) : null}
          <TakePictureButton onPictureTaken={pictureTaken} />
          <Text style={styles.coundownText}>{countdown}</Text>
        </>
      ) : (
        <>
          <Image source={{uri: pictureUrl}} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={retakePicture}>
              <Image
                source={require('../assets/retake_button.png')}
                style={styles.retakeImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={next}>
              <Image
                source={require('../assets/next_button.png')}
                style={styles.retakeImage}
              />
            </TouchableOpacity>
          </View>
        </>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000AA',
    borderRadius: 10,
  },
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '7%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  retakeButton: {
    flex: 1,
    position: 'relative',
    alignItems: 'flex-start',
  },
  retakeImage: {
    width: 120,
    height: 120,
  },
  nextButton: {
    flex: 1,
    position: 'relative',
    alignItems: 'flex-end',
  },
  nextImage: {
    width: 120,
    height: 120,
    resizeMode: 'stretch',
  },
  coundownText: {
    position: 'absolute',
    bottom: '7%',
    fontSize: 50,
    left: '47.5%',
  },
});

const mapStateToProps = ({auth}, props) => ({
  auth,
  props,
});

const mapDispatchToProps = dispatch => ({
  uploadPicture: (data, baseUrl) => dispatch(onUploadPicture(data, baseUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
