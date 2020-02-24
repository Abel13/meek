import React, { useRef } from 'react';
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

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSubmit() {
    navigation.navigate('SignIn');
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CADASTRO</Text>
          <View style={{ width: '70%' }}>
            <Input
              placeholder="Nome de Usuário"
              maxLenght={10}
              icon="person-outline"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <Input
              autoCorrect={false}
              placeholder="E-Mail"
              icon="mail-outline"
              autoCapitalize="none"
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Input
              secureTextEntry
              placeholder="Senha"
              icon="lock-outline"
              returnKeyType="next"
              ref={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <Input
              secureTextEntry
              placeholder="Confirme sua senha"
              icon="lock-outline"
              returnKeyType="send"
              ref={confirmPasswordRef}
              onSubmitEditing={handleSubmit}
            />
          </View>

          <Button text="CADASTRAR" onPress={handleSubmit} />
        </View>
      </View>
    </>
  );
}
