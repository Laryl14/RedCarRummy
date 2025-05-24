import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore, Player } from '../store/useGameStore';

const GameFooter: React.FC = () => {
  const players = useGameStore((s) => s.players);

  return (
    <View style={styles.container}>
      {players.map((p: Player) => (
        <View key={p.id} style={styles.player}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.score}>{p.gameScore}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  player: {
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
  },
  score: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GameFooter;
