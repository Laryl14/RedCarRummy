// File: src/components/ColorPalette.tsx

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type VehicleColor =
  | 'Default'
  | 'Yellow'
  | 'Green'
  | 'Orange'
  | 'Purple'
  | 'Pink';

const colors: { label: VehicleColor; hex: string }[] = [
  { label: 'Default', hex: '#DDD' },
  { label: 'Yellow', hex: '#FFEB3B' },
  { label: 'Green', hex: '#8BC34A' },
  { label: 'Orange', hex: '#FF9800' },
  { label: 'Purple', hex: '#9C27B0' },
  { label: 'Pink', hex: '#E91E63' },
];

type Props = {
  selected: VehicleColor;
  onSelect: (c: VehicleColor) => void;
};

const ColorPalette: React.FC<Props> = ({ selected, onSelect }) => (
  <View style={styles.row}>
    {colors.map((c) => (
      <TouchableOpacity
        key={c.label}
        style={[
          styles.swatch,
          { backgroundColor: c.hex },
          selected === c.label && styles.selected,
        ]}
        onPress={() => onSelect(c.label)}
      >
        <Text style={styles.label}>{c.label[0]}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#000',
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
});

export default ColorPalette;
