import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  image: {
    width: 150,
    resizeMode: 'contain',
  },
});

export default function Input({ placeholder, password, text }) {
  return (
    <View style={{}}>
      <TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Image
          style={styles.image}
          source={require('../../../assets/button.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
