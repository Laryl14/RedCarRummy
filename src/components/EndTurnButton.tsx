import React from 'react';
import { Button } from 'react-native';
import { useGameStore } from '../store/useGameStore';

const EndTurnButton: React.FC = () => {
  const endTurn = useGameStore((s) => s.endTurn);
  return <Button title="End Turn" onPress={endTurn} />;
};

export default EndTurnButton;
