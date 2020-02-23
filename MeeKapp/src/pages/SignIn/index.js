import React from 'react';
import { StyleSheet, Text, View, Input } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBFAFF',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'flex-start',
          marginTop: 50,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
          CRIE A SUA CONTA
        </Text>
      </View>
    </View>
  );
}
