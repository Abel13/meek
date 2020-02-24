import React, { forwardRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    marginHorizontal: 5,
    color: '#000',
  },
});

function Input({ secureTextEntry, style, icon, ...rest }, ref) {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View style={[style, styles.container]}>
      {icon && <Icon name={icon} size={20} color="#2228" />}
      <TextInput
        secureTextEntry={showPassword}
        ref={ref}
        style={styles.input}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name="remove-red-eye" size={20} color="#2228" />
        </TouchableOpacity>
      )}
    </View>
  );
}

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  secureTextEntry: false,
  icon: null,
  style: {},
};

export default forwardRef(Input);
