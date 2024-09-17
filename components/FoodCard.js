import { StyleSheet, Text, View, Pressable, Image } from "react-native";

export default function FoodCard({ props, navigation }) {
  return (
    <View style={[styles.card, { backgroundColor: props.color }]}>
      <Pressable
        onPress={() => navigation.navigate("Recipe", { recipe: props })}
        style={styles.press}
      >
        <Image source={props.image} style={styles.cardImg} />
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.desc}>{props.desc}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    margin: 10,
    borderTopEndRadius: 50,
    borderTopLeftRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 60,
  },
  press: {
    width: "100%",
    height: "100%",
  },
  cardImg: {
    width: "100%",
    marginVertical: 10,
    height: 100,
    resizeMode: "contain",
  },
  name: {
    paddingHorizontal: 10,
    textAlign: "right",
    fontWeight: "bold",
    color: "#634E73",
  },
  desc: {
    paddingHorizontal: 10,
    textAlign: "right",
    color: "#8B918F",
    fontSize: 10,
  },
});
