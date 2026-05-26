import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
<Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: '#25292e',
    },
  }}
>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Nearby Meals',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'fast-food' : 'fast-food-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="mealDetails"
        options={{
          title: 'Meal Details',
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
    
  );
}
