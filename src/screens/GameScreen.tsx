// File: src/screens/GameScreen.tsx

import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGameStore, Player } from '../store/useGameStore';
import { RootStackParamList } from '../../App';
import TurnHeader from '../components/TurnHeader';
import VehicleGrid from '../components/VehicleGrid';
import EndTurnButton from '../components/EndTurnButton';
import GameFooter from '../components/GameFooter';

type GameNav = NativeStackNavigationProp<RootStackParamList, 'Game'>;

const GameScreen: React.FC = () => {
  const navigation = useNavigation<GameNav>();
  const players = useGameStore((s) => s.players);
  const highScore = useGameStore((s) => s.highScore);
  const saveHighScore = useGameStore((s) => s.saveHighScore);
  const round = useGameStore((s) => s.round);
  const totalRounds = useGameStore((s) => s.totalRounds);

  const finish = () => {
    const maxScore = Math.max(...players.map((p: Player) => p.gameScore));
    const isNewHigh = maxScore > highScore.score;
    if (isNewHigh) saveHighScore();
    navigation.replace('Results', { isNewHigh });
  };

  // Auto‐finish when round count exceeded
  useEffect(() => {
    if (round > totalRounds) {
      finish();
    }
  }, [round, totalRounds]);

  return (
    <View style={styles.container}>
      <TurnHeader />

      <VehicleGrid />

      <EndTurnButton />

      {/* Manual Finish Game button (optional override) */}
      <Button title="Finish Game" onPress={finish} />

      <GameFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
});

export default GameScreen;
