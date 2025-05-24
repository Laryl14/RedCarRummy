// File: src/components/RoundsPicker.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

const RoundsPicker: React.FC = () => {
  const totalRounds = useGameStore((state) => state.totalRounds);
  const setTotalRounds = useGameStore((state) => state.setTotalRounds);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rounds: {totalRounds}</Text>
      <View style={styles.buttons}>
        <Button
          title="–"
          onPress={() => setTotalRounds(Math.max(1, totalRounds - 1))}
        />
        <Button title="+" onPress={() => setTotalRounds(totalRounds + 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  label: { flex: 1, fontSize: 16 },
  buttons: { flexDirection: 'row' },
});

export default RoundsPicker;
