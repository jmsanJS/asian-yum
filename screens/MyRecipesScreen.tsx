import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { recipes } from "../data/recipes";
import FoodCard from "../components/FoodCard";
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { Bookmark, RecipeProps, RootStackParamList } from "../types";
import { RootState } from "../App";
import { ReactNode } from "react";

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, "DrawerNavigator">;

type Props = {
  navigation: SearchScreenNavigationProp;
};

export default function MyRecipesScreen({ navigation }: Props) {
  const favorites = useSelector((state: RootState) => state.favorites.value);
  let recipesFavorited: RecipeProps | ReactNode = <Text>No recipes at the moment...</Text>;
  if (favorites.length > 0) {
    recipesFavorited = recipes
      .filter((recipe) => favorites.some((fav: Bookmark) => fav.id === recipe.id))
      .map((recipe, i) => (
        <FoodCard key={i} props={{ ...recipe }} navigation={navigation} />
      ));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.cardsContainer}>{recipesFavorited}</View>
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
