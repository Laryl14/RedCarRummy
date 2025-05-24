import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeNav = NativeStackNavigationProp<RootStackParamList, 'Results'>;

const BackToHomeButton: React.FC = () => {
  const navigation = useNavigation<HomeNav>();
  return (
    <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
  );
};

export default BackToHomeButton;
