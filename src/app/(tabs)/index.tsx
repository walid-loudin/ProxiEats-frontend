import { Text, View, StyleSheet, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getNearbyMealsFromApiAsync } from '@/src/apis/httpRequests';
import { Meal } from '../../types/Meal';
import { useRouter } from 'expo-router';

const  widthScreen = Dimensions.get('window').width - 10;

export default function Index() {

//Router for navigation
const router = useRouter();
const [isLoading, setLoading] = useState(true);
const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function loadMeals() {
      try { 
      const data = await getNearbyMealsFromApiAsync();
      setMeals(data);
    } catch (error) {
      console.error(error);
    }   finally {
      setLoading(false);
    }}
    loadMeals();
  }, []);
  return (
    <View style={styles.container}> 
      <Text style={styles.text}>Nearby meals</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={meals}
          numColumns={2}
          columnWrapperStyle={styles.columnStyle}
          renderItem={({ item }) => (
            <TouchableOpacity
            key={item.id}
            onPress={() =>  router.navigate({ pathname: '/mealDetails', params: { id: item.id } })}>
              <View style={styles.mealCard}>
                <Text style={styles.text}>ID: {item.id}</Text>
                <Text style={styles.text}>Name: {item.name}</Text>
                <Text style={styles.text}>Restaurant: {item.restaurantName}</Text>
                <Text style={styles.text}>Calories: {item.calories}</Text>
                <Text style={styles.text}>Protein: {item.proteinGrams}</Text>
              </View>
            </TouchableOpacity>
        )}
      />)}
    </View>
  );
}




//Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  mealCard: {
    height: 150,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    width: widthScreen / 2 - 10,
    marginTop: 20,
  },
  columnStyle: {
    gap: 10,  
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
