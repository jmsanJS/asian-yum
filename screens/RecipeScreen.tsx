import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowLeft,
  faClock,
  faSpoon,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  updateServings,
} from "../reducers/favorites";
import { useState, useEffect } from "react";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Bookmark, RootStackParamList } from "../types";
import { RootState } from "../App";

type RecipeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recipe'>;
type RecipeScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;

type Props = {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
};

export default function RecipeScreen({ navigation, route }: Props) {
  const [servings, setServings] = useState<number>(1);
  const bookmarks = useSelector((state: RootState) => state.favorites.value);
  const dispatch = useDispatch();
  const { recipe } = route.params;
  const bookmarkUpdate = bookmarks.find((bookmark: Bookmark) => bookmark.id === recipe.id);

  useEffect(()=>{
    if (bookmarkUpdate && bookmarkUpdate.servings !== servings) {
      setServings(bookmarkUpdate.servings);
    }
  }, [bookmarkUpdate, servings])

  const ingredients = recipe.ingredients.map((data, i) => {
    return (
      <View key={i} style={styles.ingrItemContainer}>
        <Text style={{ fontWeight: "bold", color: "#888" }}>{data.name}</Text>
        <Text style={{ fontWeight: "bold", color: "#888" }}>
          {data.amount * servings} {data.unit}
        </Text>
      </View>
    );
  });

  const isBookmarked = bookmarks.some((bookmark: Bookmark) => bookmark.id === recipe.id);

  const handleFavoriteClick = () => {
    if (isBookmarked) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite({ id: recipe.id, servings }));
    }
  };

  const handleServingsPlusClick = () => {
    setServings(servings + 1);
    if (isBookmarked) {
      dispatch(updateServings({ id: recipe.id, servings: servings + 1 }));
    }
  };

  const handleServingsMinusClick = () => {
    if (servings > 1) {
      setServings(servings - 1);
      if (isBookmarked) {
        dispatch(updateServings({ id: recipe.id, servings: servings - 1 }));
      }
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topContainer, { backgroundColor: recipe.color }]}>
        <Pressable
          style={{ width: 50 }}
          onPress={() => navigation.navigate("DrawerNavigator", {screen: "Search"})}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} style={styles.arrow} />
        </Pressable>
        <Image source={recipe.image} style={styles.foodImg} />
      </View>
      {/* Only for styling purposes (right curve on the bottom of top container) */}
      <View
        style={{
          backgroundColor: recipe.color,
          zIndex: 1,
          width: "100%",
          height: 130,
        }}
      ></View>
      <View style={styles.descContainer}>
        <Pressable
          onPress={handleFavoriteClick}
          style={styles.bookmarkContainer}
        >
          <FontAwesomeIcon
            icon={isBookmarked ? fasBookmark : farBookmark}
            size={20}
            style={styles.bookmark}
          />
        </Pressable>
        <View style={styles.iconsContainer}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faSpoon} size={20} style={styles.icons} />
            <Text style={{ fontWeight: "bold" }}>{recipe.level}</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faClock} size={20} style={styles.icons} />
            <Text style={{ fontWeight: "bold" }}>{recipe.time}</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faStar} size={20} style={styles.icons} />
            <Text style={{ fontWeight: "bold" }}>{recipe.rating}</Text>
          </View>
        </View>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.desc}>{recipe.desc}</Text>
        <View style={styles.questionContainer}>
          <Text style={{ fontWeight: "bold" }}>How many servings?</Text>
          <View style={styles.quantity}>
            <Pressable
              style={{ padding: 15 }}
              onPress={handleServingsMinusClick}
            >
              <Text style={styles.quantitySymbol}>-</Text>
            </Pressable>
            <Text style={styles.quantityNum}>{servings}</Text>
            <Pressable
              style={{ padding: 15 }}
              onPress={handleServingsPlusClick}
            >
              <Text style={styles.quantitySymbol}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.ingrContainer}>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            {ingredients}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topContainer: {
    borderBottomLeftRadius: 120,
    overflow: "hidden",
    zIndex: 2,
  },
  arrow: {
    color: "#666",
    marginTop: 50,
    marginLeft: 20,
  },
  foodImg: {
    width: "100%",
    marginVertical: 25,
    height: 200,
    resizeMode: "contain",
  },
  descContainer: {
    marginTop: -130,
    padding: 20,
    backgroundColor: "#fff",
    borderTopRightRadius: 120,
    zIndex: 2,
    position: "relative",
  },
  bookmarkContainer: {
    backgroundColor: "#655074",
    padding: 20,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    position: "absolute",
    right: 20,
    top: -10,
  },
  bookmark: {
    color: "#fff",
    borderWidth: 4,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    marginBottom: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    color: "#FFEB85",
    fontSize: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "500",
  },
  desc: {
    color: "#333",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderRadius: 25,
    width: 120,
    backgroundColor: "#eee",
  },
  ingrContainer: {
    backgroundColor: "#fff",
    maxHeight: 200,
  },
  quantityNum: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 15,
  },
  quantitySymbol: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ingrItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
});
