import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { recipes } from "../data/recipes";
import FoodCard from "../components/FoodCard";
// import { ScrollView } from "react-native-gesture-handler";

// Page pour la liste des recettes
// La liste sera récupérée du fichier data/recipes.js exportant un tableau d’objets

export default function SearchScreen({ navigation }) {
  const data = recipes.map((recipe, i) => {
    return <FoodCard key={i} props={{ ...recipe }} navigation={navigation} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.question}>What do you want to eat today?</Text>
          <Text style={styles.propositions}>Our daily healthy meal plans</Text>
        </View>
        <View style={styles.cardsContainer}>{data}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    padding: 20,
  },
  question: {
    color: "#634E73",
    fontSize: 24,
    fontWeight: "bold",
  },
  propositions: {
    color: "#8B918F",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});
