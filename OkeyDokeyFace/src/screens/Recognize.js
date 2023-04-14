import {View, Text} from 'react-native';
import React from 'react';
import CameraScreen from '../components/CameraScreen';

const Recognize = () => {
  return (
    <View style={{flex: 1}}>
      <CameraScreen state={1} />
    </View>
  );
};

export default Recognize;
