// File: src/components/GameLeaderboard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore, Player } from '../store/useGameStore';

type Props = {
  highlightId?: string;
};

const GameLeaderboard: React.FC<Props> = ({ highlightId }) => {
  const players = useGameStore((s) => s.players);
  const sorted = [...players].sort((a, b) => b.gameScore - a.gameScore);

  return (
    <View style={styles.container}>
      {sorted.map((p, i) => {
        const isWinner = p.id === highlightId;
        return (
          <View key={p.id} style={[styles.row, isWinner && styles.winnerRow]}>
            <Text style={[styles.rank, isWinner && styles.winnerText]}>
              {i + 1}.
            </Text>
            <Text style={[styles.name, isWinner && styles.winnerText]}>
              {p.name}
            </Text>
            <Text style={[styles.score, isWinner && styles.winnerText]}>
              {p.gameScore} pts
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  winnerRow: {
    backgroundColor: '#FFF9C4',
    borderRadius: 6,
  },
  rank: { width: 24, fontWeight: '600' },
  name: { flex: 1 },
  score: { width: 80, textAlign: 'right' },
  winnerText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF4081',
  },
});

export default GameLeaderboard;
