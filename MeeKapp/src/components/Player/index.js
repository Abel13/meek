import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 50,
  },
});

export default function Player({ user }) {
  const [heart] = useState('♥');

  return (
    <>
      {!user ? (
        <View />
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: `https://api.adorable.io/avatars/285/${user.email}.png`,
            }}
          />
          <View
            style={{
              width: 75,
              marginTop: 5,
              paddingVertical: 2,
              borderColor: '#FFF',
              borderWidth: 1,
              borderTopEndRadius: 5,
              borderTopStartRadius: 5,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>{user.username}</Text>

            <Text style={{ color: '#fff', fontSize: 7 }}>
              {heart.repeat(user.life)}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

Player.propTypes = {
  user: PropTypes.object,
};

Player.defaultProps = {
  user: {
    email: '',
    username: '',
    life: 0,
  },
};
