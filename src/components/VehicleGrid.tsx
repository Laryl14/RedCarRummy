// File: src/components/VehicleGrid.tsx

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import BonusToggle from './BonusToggle';

const vehicles = [
  { label: 'Car', points: 1 },
  { label: 'Truck', points: 2 },
  { label: 'Bus', points: 3 },
  { label: 'Motorcycle', points: 4 },
  { label: 'Red Car', points: 0, isRed: true },
];

const VehicleGrid: React.FC = () => {
  const tapVehicle = useGameStore((s) => s.tapVehicle);
  const endTurn = useGameStore((s) => s.endTurn);
  const bonusEnabled = useGameStore((s) => s.bonusEnabled);

  const handlePress = (v: (typeof vehicles)[0]) => {
    if (v.isRed) {
      endTurn();
    } else {
      tapVehicle(v.points, bonusEnabled);
    }
  };

  return (
    <>
      {/* Top banner — only shows when bonusEnabled is true */}
      <BonusToggle />

      {/* Vehicle spotting grid */}
      <View style={styles.grid}>
        {vehicles.map((v) => (
          <TouchableOpacity
            key={v.label}
            style={[styles.button, v.isRed && styles.red]}
            onPress={() => handlePress(v)}
          >
            <Text style={styles.text}>{v.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    width: '40%',
    padding: 16,
    backgroundColor: '#DDD',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  red: {
    backgroundColor: '#F66',
  },
  text: {
    fontSize: 16,
  },
});

export default VehicleGrid;
