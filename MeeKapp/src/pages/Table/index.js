import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Button, StatusBar } from 'react-native';
import Card from '../../components/Card';

import { cards } from '../../components/Card/cards';
import Player from '../../components/Player';
import Bet from '../../components/Bet';
import Modal from '../../components/Modal';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  room: {
    position: 'absolute',
    elevation: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaDivision: { flexDirection: 'row', alignItems: 'center' },
  table: {
    backgroundColor: '#4A4',
    borderColor: '#225522',
    borderWidth: 10,
    width: '60%',
    height: '60%',
    borderRadius: 20,
  },
  playerArea: {
    flex: 1,
  },
  playerSit: {
    borderColor: '#DCDCDC',
    borderWidth: 3,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '60%',
    height: '30%',
  },
  myCardsArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shackle: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Table() {
  const [modalBetVisible, setModalBetVisible] = useState(true);

  function closeModal() {
    setModalBetVisible(false);
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.room}>
          <View style={styles.table}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 0.7,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 10,
                  }}
                >
                  <Card direction="upside-down" />
                  <Card direction="upside-down" />
                  <Card
                    onPress={() => {
                      setModalBetVisible(true);
                    }}
                    data={cards[28]}
                    direction="upside-down"
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  margin: 15,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Card direction="left" data={cards[26]} />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Card direction="right" data={cards[31]} />
                </View>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card />
              </View>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  margin: 15,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  {/* <Card direction="left" data={cards[44]} /> */}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Card direction="right" data={cards[22]} />
                </View>
              </View>
              <View style={styles.shackle}>
                <Card data={cards[27]} />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.areaDivision, { flex: 1 }]}>
          <View
            style={[
              { justifyContent: 'center', alignItems: 'center' },
              styles.playerArea,
            ]}
          >
            <Player
              user={{ username: 'abelb13', email: 'abel@email.com', life: 3 }}
              style={styles.playerSit}
            />
          </View>
          <View
            style={[
              { justifyContent: 'flex-start', alignItems: 'center' },
              styles.playerArea,
            ]}
          >
            <Player
              user={{ username: 'kim', email: 'kim@email.com', life: 5 }}
              style={styles.playerSit}
            />
          </View>
          <View
            style={[
              { justifyContent: 'flex-start', alignItems: 'flex-start' },
              styles.playerArea,
            ]}
          >
            <Player
              user={{
                username: 'Lx Dr e',
                email: 'alexandre@email.com',
                life: 2,
              }}
              style={styles.playerSit}
            />
          </View>
        </View>
        <View
          style={[
            styles.areaDivision,
            { flex: 1, justifyContent: 'space-between' },
          ]}
        >
          <View
            style={[
              {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              },
              styles.playerArea,
            ]}
          >
            <Player
              user={{ username: 'Linica', email: 'aline@email.com', life: 5 }}
              style={styles.playerSit}
            />
          </View>
          <View style={styles.playerArea} />
          <View
            style={[
              styles.areaDivision,
              {
                flex: 1,
                justifyContent: 'flex-end',
              },
            ]}
          >
            <Player
              user={{ username: 'Aninha', email: 'anarita@email.com', life: 5 }}
              style={styles.playerSit}
            />
          </View>
        </View>
        <View
          style={[
            styles.areaDivision,
            { flex: 1, justifyContent: 'space-between' },
          ]}
        >
          <View
            style={[
              {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              },
              styles.playerArea,
            ]}
          >
            <Player style={styles.playerSit} />
          </View>
          <View style={styles.playerArea} />
          <View
            style={[
              styles.areaDivision,
              {
                flex: 1,
                justifyContent: 'flex-end',
              },
            ]}
          >
            <Player
              user={{ username: 'aod16', email: 'aod16@email.com', life: 4 }}
              style={styles.playerSit}
            />
          </View>
        </View>
        <View
          style={[
            {
              marginHorizontal: '10%',
              flex: 0.8,
              zIndex: 2,
            },
          ]}
        >
          <View style={[styles.areaDivision, { marginTop: 20 }]}>
            <View style={styles.myCardsArea}>
              <Card data={cards[15]} />
            </View>
            <View style={styles.myCardsArea}>
              <Card data={cards[25]} />
            </View>
            <View style={styles.myCardsArea}>
              <Card data={cards[38]} />
            </View>
            <View style={styles.myCardsArea}>
              <Card data={cards[5]} />
            </View>
            <View style={styles.myCardsArea}>
              <Card />
            </View>
            <View style={styles.myCardsArea}>
              <Card />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 20 }}>♥♥♥♥♥</Text>
          </View>
        </View>
      </View>
      <View>
        <Modal
          title="QUAL SUA APOSTA?"
          closeModal={() => closeModal()}
          visible={modalBetVisible}
          confirmText="APOSTAR"
        >
          <Bet max={5} blocked={1} />
        </Modal>
      </View>
    </>
  );
}
