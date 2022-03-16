import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const GameOverScreen = ({
  roundsNumber,
  userNumber,
  onRestart,
}: GameOverScreenProps) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={defaultStyles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          style={styles.image}
          source={{
            uri: "https://media.istockphoto.com/photos/mount-ama-dablam-within-clouds-picture-id938914580?k=20&m=938914580&s=612x612&w=0&h=7qP2yd8Dzy2GgeVtVn3jCtv2KiztjJVA62TkXiBsCtE=",
          }}
        />
      </View>
      <Text
        style={{
          ...defaultStyles.bodyText,
          marginHorizontal: 30,
          textAlign: "center",
          marginBottom: 20,
          fontSize: 15,
        }}
      >
        Your phone needed{" "}
        <Text style={styles.highlightedText}>{roundsNumber}</Text> rounds to
        guess the number{" "}
        <Text style={styles.highlightedText}>{userNumber}</Text>
      </Text>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlightedText: {
    color: colors.primary,
  },
});

export default GameOverScreen;
