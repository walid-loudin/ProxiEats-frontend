import {
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { getNearbyMealsFromApiAsync } from "@/src/apis/httpRequests";
import { Meal } from "../../types/Meal";
import { useRouter } from "expo-router";
import { styles } from "../../styles/globalStyles";
import * as Location from "expo-location";
import filter from "../../constant/filter";


export default function Index() {
  //Router for navigation
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(filter[0]);


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  useEffect(() => {
    async function loadMeals() {
      try {
        const data = await getNearbyMealsFromApiAsync(selectedFilter);
        setMeals(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);  
      }
    }
     async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    loadMeals();
    getCurrentLocation();
  }, [selectedFilter]);


let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.latitude) + " " + JSON.stringify(location.coords.longitude);
  }

  return ( 
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterButton}>
          <Button title="HIGH PROTEIN" onPress={() => setSelectedFilter(filter[0])} />
        </View>

        <View style={styles.filterButton}>
          <Button title="LOW CAL" onPress={() => setSelectedFilter(filter[1])}   />
        </View>

        <View style={styles.filterButton}>
          <Button title="LOW CARB" onPress={() => setSelectedFilter(filter[2])} />
        </View>

        <View style={styles.filterButton}>
          <Button title="LOW FAT" onPress={() => setSelectedFilter(filter[3])} />
        </View>
      </View>
      <Text style={styles.text}>Current Location: {text}</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (

        <FlatList
          data={meals}
          numColumns={2}
          columnWrapperStyle={styles.columnStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.navigate({
                  pathname: "/mealDetails",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.mealCard}>
                <Text style={styles.text}>ID: {item.id}</Text>
                <Text style={styles.text}>Name: {item.name}</Text>
                <Text style={styles.text}>
                  Restaurant: {item.restaurantName}
                </Text>
                <Text style={styles.text}>Calories: {item.calories}</Text>
                <Text style={styles.text}>Protein: {item.proteinGrams}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      )} 

    </View>
  );
}