// File: src/components/TurnHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

const TurnHeader: React.FC = () => {
  // ✅ separate selectors to avoid object‐literal re‐subscriptions
  const players = useGameStore((state) => state.players);
  const currentTurn = useGameStore((state) => state.currentTurn);
  const round = useGameStore((state) => state.round);

  const player = players[currentTurn] || { name: '', gameScore: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {player.name} – Turn {currentTurn + 1} | Round {round}
      </Text>
      <Text style={styles.score}>Total: {player.gameScore} pts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  score: {
    fontSize: 14,
    color: '#555',
  },
});

export default TurnHeader;
