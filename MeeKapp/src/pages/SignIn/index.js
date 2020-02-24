import React, { useRef } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as AuthActions from '../../store/modules/auth/actions';

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
  const dispatch = useDispatch();
  const players = useSelector(state => state.players);

  const passwordRef = useRef();

  function createAccount() {
    navigation.navigate('SignUp');
  }

  function handleSubmit({ email, password }) {
    dispatch(AuthActions.signInRequest(email, password));
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={{ width: '70%' }}>
            <Input
              autoCorrect={false}
              placeholder="E-Mail"
              icon="mail-outline"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Input
              secureTextEntry
              placeholder="Password"
              icon="lock-outline"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <Button
            text="LOGIN"
            onPress={() => {
              navigation.navigate('Menu');
            }}
          />
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
