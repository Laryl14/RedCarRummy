// File: src/screens/ResultsScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GameLeaderboard from '../components/GameLeaderboard';
import NewHighScoreBanner from '../components/NewHighScoreBanner';
import PlayAgainButton from '../components/PlayAgainButton';
import BackToHomeButton from '../components/BackToHomeButton';
import { useGameStore, Player } from '../store/useGameStore';

type ResultsRoute = RouteProp<RootStackParamList, 'Results'>;
type ResultsNav = NativeStackNavigationProp<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC = () => {
  const route = useRoute<ResultsRoute>();
  const navigation = useNavigation<ResultsNav>();
  const players = useGameStore((s) => s.players);

  // sort descending and grab winner
  const sorted = [...players].sort((a, b) => b.gameScore - a.gameScore);
  const winner = sorted[0] as Player;

  // optional “new all-time high” flag
  const isNewHigh = route.params?.isNewHigh ?? false;

  return (
    <View style={styles.container}>
      {/* 🎉 BIG WINNER BANNER */}
      <View style={styles.winnerBanner}>
        <View style={styles.winnerBadge}>
          <Text style={styles.winnerEmoji}>🎉</Text>
        </View>
        <Text style={styles.winnerText}>
          {winner.name.toUpperCase()} WINS {winner.gameScore} PTS!
        </Text>
        <View style={styles.winnerBadge}>
          <Text style={styles.winnerEmoji}>🎉</Text>
        </View>
      </View>

      {isNewHigh && <NewHighScoreBanner />}

      {/* leaderboard with highlighted winner */}
      <GameLeaderboard highlightId={winner.id} />

      <PlayAgainButton />
      <BackToHomeButton />
    </View>
  );
};

import { Text } from 'react-native'; // place at bottom so TS doesn’t complain about multiple default imports

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  winnerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  winnerBadge: {
    marginHorizontal: 8,
  },
  winnerEmoji: {
    fontSize: 32,
  },
  winnerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF4081',
  },
});

export default ResultsScreen;
