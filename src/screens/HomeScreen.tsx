// File: src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HighScoreBanner from '../components/HighScoreBanner';
import PlayerListEditor from '../components/PlayerListEditor';
import RoundsPicker from '../components/RoundsPicker';
import { useGameStore, VehicleColor } from '../store/useGameStore';
import { RootStackParamList } from '../../App';

type HomeNav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNav>();
  const startGame = useGameStore((s) => s.startGame);
  const bonusEnabled = useGameStore((s) => s.bonusEnabled);
  const setBonusEnabled = useGameStore((s) => s.setBonusEnabled);
  const setBonusType = useGameStore((s) => s.setBonusType);
  const setBonusColor = useGameStore((s) => s.setBonusColor);
  const setBonusPoints = useGameStore((s) => s.setBonusPoints);

  const [type, setType] = useState('Car');
  const [color, setColor] = useState<VehicleColor>('Yellow');
  const [points, setPoints] = useState(2);

  const onStart = () => {
    if (bonusEnabled) {
      setBonusType(type);
      setBonusColor(color);
      setBonusPoints(points);
    }
    startGame();
    navigation.navigate('Game');
  };

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <HighScoreBanner />

        <PlayerListEditor />

        <RoundsPicker />

        <View style={styles.bonusContainer}>
          <View style={styles.bonusToggle}>
            <Text>Enable Bonus Mode</Text>
            <Switch value={bonusEnabled} onValueChange={setBonusEnabled} />
          </View>

          {bonusEnabled && (
            <>
              <Text style={styles.label}>Car Type:</Text>
              <Picker
                selectedValue={type}
                onValueChange={(v) => setType(v as string)}
              >
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Truck" value="Truck" />
                <Picker.Item label="Bus" value="Bus" />
                <Picker.Item label="Motorcycle" value="Motorcycle" />
              </Picker>

              <Text style={styles.label}>Rare Color:</Text>
              <Picker
                selectedValue={color}
                onValueChange={(v) => setColor(v as VehicleColor)}
              >
                <Picker.Item label="Yellow" value="Yellow" />
                <Picker.Item label="Green" value="Green" />
                <Picker.Item label="Orange" value="Orange" />
                <Picker.Item label="Purple" value="Purple" />
                <Picker.Item label="Pink" value="Pink" />
              </Picker>

              <Text style={styles.label}>Bonus Points:</Text>
              <Picker
                selectedValue={points}
                onValueChange={(v) => setPoints(Number(v))}
              >
                <Picker.Item label="+2" value={2} />
                <Picker.Item label="+3" value={3} />
                <Picker.Item label="+4" value={4} />
                <Picker.Item label="+5" value={5} />
              </Picker>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Start Game" onPress={onStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  bonusContainer: { marginVertical: 16 },
  bonusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { marginTop: 8, fontWeight: '600' },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
