import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RareColorBar: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Rare Colors (+2 bonus): Yellow, Green, Orange, Purple, Pink
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  text: { fontSize: 14, textAlign: 'center', color: '#555' },
});

export default RareColorBar;
