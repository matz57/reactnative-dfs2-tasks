import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BoutonProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  text?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Bouton = ({ iconName, text, onPress }: BoutonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {iconName && <Ionicons name={iconName} size={24} color="white" />}
      {text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    color: 'white',
    marginLeft: 5,
  },
});

export default Bouton;
