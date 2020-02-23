import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../components/Input';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 30, color: '#FFF', margin: 50 },
  createAccount: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 20,
  },
});

export default function SignIn({ navigation }) {
  function createAccount() {
    navigation.navigate('SignUp');
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={{ width: '100%' }}>
            <Input placeholder="Email" />
            <Input password placeholder="Password" />
          </View>

          <Button />
          <TouchableOpacity
            onPress={() => {
              createAccount();
            }}
          >
            <Text style={styles.createAccount}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
