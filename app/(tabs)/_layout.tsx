import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListeTacheScreen from '../(tabs)/ListeTacheScreen';
import AjouterTacheScreen from '../(tabs)/AjouterTacheScreen';
import {TabBarIcon} from '../../components/navigation/TabBarIcon'

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListeTaches"
        component={ListeTacheScreen}
        options={{
          title: 'Liste des tâches',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AjouterTache"
        component={AjouterTacheScreen}
        options={{
          title: 'Ajouter une tâche',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="add-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}