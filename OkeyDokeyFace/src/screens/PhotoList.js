import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import axios from 'axios';

const PhotoList = ({route, navigation}) => {
  const {photos} = route.params;
  const [imageDataList, setImageDataList] = useState([]);

  const uploadData = async () => {
    try {
      var body = new FormData();
      var photo = {
        uri: imageDataList[0],
        type: 'multipart/form-data',
        name: 'test.jpg',
      };
      body.append('image', photo);

      await axios.post('http://192.168.0.15:8080/server/register', body, {
        headers: {'Content-Type': 'multipart/form-data'},
        transformRequest: formData => formData,
        withCredentials: true,
      });

      console.log('🥹 image upload complete!');
    } catch (error) {
      console.log('😛 Error :', error);
    }
    console.log(imageDataList[0]);
  };

  const getFileContent = async source => {
    const fileContent = await RNFS.readFile(source, 'base64');
    return 'data:image/jpeg;base64,' + fileContent;
  };

  //배열로 념거진 경로를 모두 이미지 데이터로 변화시키기
  useEffect(() => {
    setImageDataList([]);
    const fetchImageData = async () => {
      const data = await Promise.all(
        photos.map(async photo => await getFileContent(photo)),
      );
      setImageDataList(data);
    };
    fetchImageData();
  }, [photos]);

  return (
    <ScrollView>
      <Text>{photos}</Text>
      <View>
        {imageDataList &&
          imageDataList.map((data, index) => {
            return (
              <Image
                key={index}
                source={{uri: data}}
                style={{width: 200, height: 200}}
              />
            );
          })}
      </View>
      <View
        style={{
          width: 100,
          height: 50,
          backgroundColor: 'pink',
        }}>
        <TouchableOpacity onPress={() => uploadData()}>
          <Text>upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PhotoList;
