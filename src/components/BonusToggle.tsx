// File: src/components/BonusToggle.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

const BonusToggle: React.FC = () => {
  // read from the store
  const enabled = useGameStore((s) => s.bonusEnabled);
  const { type, color, points } = useGameStore((s) => s.bonusConfig);
  const applyBonus = useGameStore((s) => s.applyBonus);

  // only show the button when bonus mode is on
  if (!enabled) return null;

  return (
    <TouchableOpacity style={styles.button} onPress={applyBonus}>
      <Text style={styles.text}>
        🌟 Bonus On: {color} {type} +{points}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BonusToggle;
