import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGameStore } from '../store/useGameStore';
import { RootStackParamList } from '../../App';

type HomeNav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const StartGameButton: React.FC = () => {
  const navigation = useNavigation<HomeNav>();
  const players = useGameStore((state) => state.players);
  const startGame = useGameStore((state) => state.startGame);

  const onPress = () => {
    if (players.length === 0) return;
    startGame();
    navigation.navigate('Game');
  };

  return <Button title="Start Game" onPress={onPress} />;
};

export default StartGameButton;
