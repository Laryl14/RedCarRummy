import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

const HighScoreBanner: React.FC = () => {
  const { name, score } = useGameStore((state) => state.highScore);
  if (!name) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        All-time best: {score} pts — {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HighScoreBanner;
