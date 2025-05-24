import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useGameStore, Player } from '../store/useGameStore';

type Props = { player: Player };

const PlayerRow: React.FC<Props> = ({ player }) => {
  const updateName = useGameStore((state) => state.updatePlayerName);
  const remove = useGameStore((state) => state.removePlayer);

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={player.name}
        placeholder="Player name"
        onChangeText={(text) => updateName(player.id, text)}
      />
      <TouchableOpacity onPress={() => remove(player.id)}>
        <Text style={styles.delete}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    padding: 8,
  },
  delete: {
    marginLeft: 8,
    fontSize: 18,
  },
});

export default PlayerRow;
