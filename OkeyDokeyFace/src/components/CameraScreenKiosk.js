import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Linking,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import * as RNFS from 'react-native-fs';
import axios from 'axios';

const CameraScreenKiosk = () => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.front;

  const [imageSource, setImageSource] = useState(null);
  const [imageDataList, setImageDataList] = useState(null);
  // const [photos, setPhotos] = useState([]); // 보낼 사진들 빈 배열로 초기화

  //김연출의 키오스크 사진 보내기
  const uploadData = async () => {
    try {
      // 폼데이터 생성
      var body = new FormData();
      var photo = {
        uri: imageDataList,
        type: 'multipart/form-data',
        name: '1.jpg',
      };
      body.append('image', photo);
      // 서버에게 전송
      axios.post('http://192.168.201.12:8080/server/recog', body, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      console.log('🥹 image upload complete!');
    } catch (error) {
      console.log('😛 Error :', error);
    }
  };

  const capturePhoto = async () => {
    if (camera.current == null) {
      return;
    }

    const photo = await camera.current.takePhoto({});
    setImageSource(photo.path);
    console.log(photo.path);
    // setPhotos(prevPhotos => [...prevPhotos, photo.path]);

    uploadData();
  };

  const getFileContent = async source => {
    const fileContent = await RNFS.readFile(source, 'base64');
    return 'data:image/jpeg;base64,' + fileContent;
  };

  //배열로 념거진 경로를 모두 이미지 데이터로 변화시키기
  useEffect(() => {
    setImageDataList(null);
    const fetchImageData = async () => {
      const data = await getFileContent(imageSource);
      setImageDataList(data);
    };
    fetchImageData();
  }, [imageSource]);

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      <>
        <View style={{position: 'relative', width: 300, height: 300}}>
          <Camera
            ref={camera}
            style={{width: 300, height: 300}}
            device={device}
            isActive={true}
            photo={true}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>정면을 응시해 주세요</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.camButton}
            onPress={() => {
              capturePhoto();
            }}
          />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
});

export default CameraScreenKiosk;
