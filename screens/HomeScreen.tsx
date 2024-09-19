import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/home.jpg")}
        style={styles.homeImg}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Asian Yum</Text>
        <View style={styles.openAppTextContainer}>
          <Pressable
            onPress={() => navigation.navigate("DrawerNavigator", { screen: "Search" })}
            style={styles.pressableContainer}
          >
            <Text style={styles.openAppText}>Let's go!</Text>
            <FontAwesomeIcon icon={faArrowRight} size={25} color="#FFF" style={{ marginLeft: 10 }}/>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#655074",
  },
  homeImg: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
    borderBottomLeftRadius: 150,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    color: "#FFF",
    marginBottom: 10,
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  pressableContainer:{
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  openAppTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  openAppText: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
  },
});
