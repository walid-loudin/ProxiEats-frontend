
import { Dimensions, StyleSheet} from 'react-native';
const widthScreen = Dimensions.get("window").width - 10;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8
  },
  filterButton: {
    flex: 1,
  },
  text: {
    color: "#fff",
  },
  mealCard: {
    height: 150,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    width: widthScreen / 2 - 10,
    marginTop: 20,
  },
  columnStyle: {
    gap: 10,
    justifyContent: "space-between",
  },
  button: {
    fontSize: 12
  },
});
