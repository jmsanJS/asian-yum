import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/home.jpg')} style={styles.homeImg}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Asian Yum</Text>
        <View style={styles.openAppTextContainer}>
          <Text style={styles.openAppText}>Let's go!  </Text>
          <Pressable onPress={() => navigation.navigate("DrawerNavigator")}>
            <FontAwesomeIcon icon={faArrowRight} size={25} color="#FFF" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#655074"
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
    fontSize: 70,
    fontWeight: "bold",
  },
  openAppTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  openAppText: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
  },
});
