import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

const NewHighScoreBanner: React.FC = () => {
  const { name, score } = useGameStore((s) => s.highScore);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        🏆 NEW ALL-TIME HIGH – {name}: {score} pts!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default NewHighScoreBanner;
