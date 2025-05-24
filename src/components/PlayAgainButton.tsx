import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGameStore } from '../store/useGameStore';
import { RootStackParamList } from '../../App';

type HomeNav = NativeStackNavigationProp<RootStackParamList, 'Results'>;

const PlayAgainButton: React.FC = () => {
  const navigation = useNavigation<HomeNav>();
  const startGame = useGameStore((s) => s.startGame);

  const onPress = () => {
    startGame();
    navigation.replace('Game');
  };

  return <Button title="Play Again" onPress={onPress} />;
};

export default PlayAgainButton;
