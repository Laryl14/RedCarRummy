import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGameStore, GameStore } from '../store/useGameStore';

const AddPlayerButton: React.FC = () => {
  // Tell TS that `state` is GameStore
  const addPlayer = useGameStore((state: GameStore) => state.addPlayer);

  return (
    <TouchableOpacity style={styles.button} onPress={() => addPlayer('')}>
      <Text style={styles.text}>+ Add Player</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AddPlayerButton;
