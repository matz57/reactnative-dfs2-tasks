import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Bouton from '../../components/Bouton';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface Tache {
  id: string;
  text: string;
}

type RootTabParamList = {
  ListeTaches: undefined;
  AjouterTache: undefined;
};

type AjouterTacheScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'AjouterTache'>;

const AjouterTacheScreen: React.FC = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation<AjouterTacheScreenNavigationProp>();

  const ajouterTache = async () => {
    if (text.length === 0) {
      Alert.alert('Erreur', 'Le texte de la tâche ne peut pas être vide.');
      return;
    }

    const storedTaches = await AsyncStorage.getItem('taches');
    const taches: Tache[] = storedTaches ? JSON.parse(storedTaches) : [];

    const newTaches = [...taches, { id: Date.now().toString(), text }];

    await AsyncStorage.setItem('taches', JSON.stringify(newTaches));
    setText(''); // Clear the input field after adding the task
    navigation.navigate('ListeTaches');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Entrez la tâche"
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Bouton
        text="Ajouter la tâche"
        onPress={() => ajouterTache()}
      />
    </View>
  );
};

export default AjouterTacheScreen;