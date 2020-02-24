import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 60,
  },
  centerImage: { width: '80%', height: '80%', resizeMode: 'contain' },
  smallImage: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
    marginBottom: '10%',
  },
  topSymbol: {
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bottomSymbol: {
    alignSelf: 'flex-end',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    transform: [
      {
        rotate: '-180deg',
      },
    ],
  },
  suit: {
    height: '40%',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  faceDown: {
    backgroundColor: '#557788',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5A7A8A',
    borderWidth: 1,
    borderRadius: 5,
  },
  faceDownBackground: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceDownText: {
    color: '#FFF',
    fontSize: 7,
    fontWeight: 'bold',
  },
  faceUp: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default function App({ data, direction, ...rest }) {
  const [symbol, setSymbol] = useState('');
  const [suitPath, setSuitPath] = useState('');
  const [transform, setTransform] = useState('');
  const [color, setColor] = useState({});
  const [faceDown, setFaceDown] = useState(true);

  useEffect(() => {
    if (data) {
      setSymbol(data.symbol);
      setFaceDown(false);
      switch (data.suit) {
        case 1:
          setColor({ color: '#F00' });
          setSuitPath(require('../../../assets/diamonds.png'));
          break;
        case 2:
          setColor({ color: '#000' });
          setSuitPath(require('../../../assets/spades.png'));
          break;
        case 3:
          setColor({ color: '#F00' });
          setSuitPath(require('../../../assets/hearts.png'));
          break;
        case 4:
          setColor({ color: '#000' });
          setSuitPath(require('../../../assets/clubs.png'));
          break;
        default:
          break;
      }
    } else {
      setFaceDown(true);
    }
  }, [data]);

  useEffect(() => {
    if (direction) {
      switch (direction) {
        case 'upside-down':
          setTransform({
            transform: [
              {
                rotate: '-180deg',
              },
            ],
          });
          break;
        case 'left':
          setTransform({
            transform: [
              {
                rotate: '-270deg',
              },
            ],
          });
          break;
        case 'right':
          setTransform({
            transform: [
              {
                rotate: '-90deg',
              },
            ],
          });
          break;
        default:
          setTransform({
            transform: [
              {
                rotate: '-0deg',
              },
            ],
          });
          break;
      }
    }
  }, [direction]);

  return (
    <>
      {faceDown ? (
        <View style={[transform, styles.faceDown, styles.container]}>
          <View style={styles.faceDownBackground}>
            <Text style={styles.faceDownText}>MeeK</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity {...rest} style={[transform, styles.container]}>
          <View style={styles.faceUp}>
            <View style={styles.topSymbol}>
              <Text style={[color, styles.symbol]}>{symbol}</Text>
              <Image style={styles.smallImage} source={suitPath} />
            </View>
            <View style={styles.suit}>
              <Image style={styles.centerImage} source={suitPath} />
            </View>
            <View style={styles.bottomSymbol}>
              <Text style={[color, styles.symbol]}>{symbol}</Text>
              <Image style={styles.smallImage} source={suitPath} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
