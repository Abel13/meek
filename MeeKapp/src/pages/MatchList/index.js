import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Player from '../../components/Player';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
    margin: 10,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: '#FFF',
    margin: 10,
    fontSize: 18,
  },
  itemParticipants: {
    color: '#FFF',
    margin: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 30,
  },
});

export default function MatchList({ navigation }) {
  const [matches, setMatches] = useState([
    { id: 'a78wuaid7a8', name: 'Partida do Kim', participants: 3 },
    { id: 'a78wuaiac98', name: 'Partida do Abel', participants: 1 },
  ]);

  function Item({ title, participants, email }) {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: `https://api.adorable.io/avatars/285/${email}.png`,
            }}
          />
          <Text style={styles.itemTitle}>{title.toUpperCase()}</Text>
        </View>
        <Text style={styles.itemParticipants}>{participants}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>NOVA PARTIDA</Text>
          <Input placeholder="Nome da partida" icon="play-arrow" />
          <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
            <Button onPress={() => navigation.navigate('Room')} text="CRIAR" />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.title}>PARTIDAS ABERTAS</Text>
          <FlatList
            data={matches}
            renderItem={({ item }) => (
              <Item title={item.name} participants={item.participants} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </>
  );
}
