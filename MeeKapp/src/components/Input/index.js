import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// import { Container } from './styles';
const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 46,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
});

export default function Input({
  placeholder,
  password,
  maxLenght,
  autoCompleteType,
  keyboardType,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        keyboardType={keyboardType}
        autoCompleteType={autoCompleteType}
        secureTextEntry={password}
        maxLength={maxLenght}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
}
