import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {},
  menuTitle: {
    color: '#FFF',
    fontSize: 50,
    alignSelf: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },
  profileContainer: {
    backgroundColor: '#000',
    height: '20%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: '40%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 150,
  },
  profileButtons: { width: 50, height: 50, resizeMode: 'contain' },
});

export default function Menu({ user, navigation }) {
  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/background.jpg')}
      >
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `https://api.adorable.io/avatars/285/${user.email}.png`,
              }}
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  alignSelf: 'flex-end',
                  margin: 10,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity style={{ zIndex: 2 }}>
                  <Image
                    style={styles.profileButtons}
                    source={require('../../../assets/leaderboards.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.profileButtons}
                    source={require('../../../assets/achievements.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: '#FFF',
                  width: '100%',
                  marginBottom: 20,
                  fontSize: 17,
                  fontWeight: '700',
                }}
              >{`Olá ${user.username}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>MeeK</Text>
            <Button
              text="JOGAR"
              onPress={() => navigation.navigate('MatchList')}
            />
            {/* <Button text="AMIGOS" /> */}
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

Menu.propTypes = {
  user: PropTypes.object,
};

Menu.defaultProps = {
  user: {
    email: '',
    username: '',
  },
};
