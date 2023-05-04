import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.titleText}>오키도키 실험실</Text>
        <Image
          style={{width: '50%', height: '50%'}}
          source={require('../../assets/mainImg.jpeg')}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Sencor');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>거리측정 센서 테스트하기</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push('Receipt');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>영수증 테스트하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0080FF',
    paddingVertical: 20,
  },

  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,

    width: 200,
    height: 50,
    backgroundColor: '#0080FF',
    borderRadius: 20,
  },

  buttonText: {
    color: 'white',
  },
});

export default Home;
