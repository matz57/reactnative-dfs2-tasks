import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bouton from '../../components/Bouton';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Tache {
  id: string;
  text: string;
}

type ListeTacheScreenNavigationProp = NativeStackNavigationProp<Record<string, any>, 'ListeTaches'>;

const ListeTacheScreen = ({ navigation }: { navigation: ListeTacheScreenNavigationProp }) => {
  const [taches, setTaches] = useState<Tache[]>([]);
  const isFocused = useIsFocused();

  const fetchTaches = async () => {
    try {
      const storedTaches = await AsyncStorage.getItem('taches');
      if (storedTaches) {
        setTaches(JSON.parse(storedTaches));
      } else {
        setTaches([]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les tâches.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTaches();
    }
  }, [isFocused]);

  const supprimerTache = async (id: string) => {
    const newTaches = taches.filter(tache => tache.id !== id);
    setTaches(newTaches);
    await AsyncStorage.setItem('taches', JSON.stringify(newTaches));
  };

  const modifierTache = (id: string, text: string) => {
    const newTaches = taches.map(tache =>
      tache.id === id ? { ...tache, text } : tache
    );
    setTaches(newTaches);
  };

  const enregistrerModification = async (id: string) => {
    const newTaches = taches;
    await AsyncStorage.setItem('taches', JSON.stringify(newTaches));
    Alert.alert('Succès', 'La tâche a été mise à jour.');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={taches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TextInput
              value={item.text}
              onChangeText={(text) => modifierTache(item.id, text)}
              style={{ borderWidth: 1, padding: 10, flex: 1 }}
            />
            <Bouton text="Enregistrer" onPress={() => enregistrerModification(item.id)} />
            <Bouton text="Supprimer" onPress={() => supprimerTache(item.id)} />
          </View>
        )}
      />
      <Bouton text="Ajouter une tâche" onPress={() => navigation.navigate('AjouterTache')} />
    </View>
  );
};

export default ListeTacheScreen;