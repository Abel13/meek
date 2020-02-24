import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from 'react-native';

import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'space-between',
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

export default function Room() {
  const [players, setPlayers] = useState([
    { name: 'AbelB13', email: 'abel@email.com' },
    { name: 'Linica', email: 'linica@email.com' },
    { name: 'AbelB13', email: 'abel@email.com' },
    { name: 'Linica', email: 'linica@email.com' },
    { name: 'AbelB13', email: 'abel@email.com' },
    { name: 'Linica', email: 'linica@email.com' },
    { name: 'AbelB13', email: 'abel@email.com' },
    { name: 'Linica', email: 'linica@email.com' },
  ]);

  function Item({ name, email }) {
    return (
      <View style={styles.item}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: `https://api.adorable.io/avatars/285/${email}.png`,
            }}
          />
          <Text style={styles.itemTitle}>{name}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={{ marginTop: 30, flex: 1 }}>
          <Text style={styles.title}>PARTICIPANTES</Text>
          <FlatList
            data={players}
            renderItem={({ item }) => (
              <Item name={item.name} email={item.email} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{ margin: 10, alignItems: 'flex-end' }}>
          <Button text="INICIAR" />
        </View>
      </View>
    </>
  );
}
