// File: src/screens/ResultsScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GameLeaderboard from '../components/GameLeaderboard';
import NewHighScoreBanner from '../components/NewHighScoreBanner';
import PlayAgainButton from '../components/PlayAgainButton';
import BackToHomeButton from '../components/BackToHomeButton';

type ResultsRoute = RouteProp<RootStackParamList, 'Results'>;
type ResultsNav = NativeStackNavigationProp<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC = () => {
  const route = useRoute<ResultsRoute>();
  const navigation = useNavigation<ResultsNav>();
  // ✅ use the correct param name
  const isNewHigh = route.params?.isNewHigh ?? false;

  return (
    <View style={styles.container}>
      {isNewHigh && <NewHighScoreBanner />}
      <GameLeaderboard />
      <PlayAgainButton />
      <BackToHomeButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ResultsScreen;
