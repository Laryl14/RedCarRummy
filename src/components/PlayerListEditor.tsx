import React from 'react';
import { View } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import PlayerRow from './PlayerRow';
import AddPlayerButton from './AddPlayerButton';

const PlayerListEditor: React.FC = () => {
  const players = useGameStore((state) => state.players);
  return (
    <View>
      {players.map((p) => (
        <PlayerRow key={p.id} player={p} />
      ))}
      <AddPlayerButton />
    </View>
  );
};

export default PlayerListEditor;
