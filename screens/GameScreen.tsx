import { useState, useRef, useEffect } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";

type generateRandomBetweenType = (
  min: number,
  max: number,
  exclude: number
) => number;

interface GameScreenProps {
  userChoice: number;
  onGameOver: (roundsNumber: number) => void;
}

const generateRandomBetween: generateRandomBetweenType = (
  min: number,
  max: number,
  exclude: number
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength: number, itemData: any) => (
  <View style={styles.listItem}>
    <Text style={{ ...defaultStyles.bodyText }}>
      #{listLength - itemData.index}
    </Text>
    <Text style={{ ...defaultStyles.bodyText }}>{itemData.item}</Text>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }: GameScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [pastGuesses, setPastGuesses] = useState<string[]>([
    initialGuess.toString(),
  ]);

  const { width, height } = useWindowDimensions();

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    //setRounds((oldRounds) => oldRounds + 1);
    setPastGuesses((old) => [nextNumber.toString(), ...old]);
    setCurrentGuess(nextNumber);
  };

  if (height < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.control}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={25} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={25} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={25} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={25} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "95%",
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 500 ? "60%" : "80%",
  },
  list: {
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default GameScreen;
