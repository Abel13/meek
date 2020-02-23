import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// import { Container } from './styles';

export default function Bet({ max, blocked }) {
  const [bet, setBet] = useState(0);

  function addBet() {
    const value = bet + 1 === blocked ? 2 : 1;
    if (bet + value <= max) {
      setBet(bet + value);
    }
  }
  function subBet() {
    const value = bet - 1 === blocked ? 2 : 1;
    if (bet - value >= 0) setBet(bet - value);
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          borderWidth: 1,
          borderColor: '#333',
          backgroundColor: '#222',
          margin: 10,
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 80 }}>{bet}</Text>
      </View>
      <View style={{}}>
        <TouchableOpacity onPress={() => addBet()}>
          <Image source={require('../../../assets/up.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => subBet()}>
          <Image source={require('../../../assets/down.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
