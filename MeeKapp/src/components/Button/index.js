import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

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
  text: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  image: {
    width: 150,
  },
});

export default function Button({ loading, text, ...rest }) {
  return (
    <TouchableOpacity style={{ width: 150, flexDirection: 'row' }} {...rest}>
      <View style={styles.textContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/button.png')}
      />
    </TouchableOpacity>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  text: 'TEXT',
};
