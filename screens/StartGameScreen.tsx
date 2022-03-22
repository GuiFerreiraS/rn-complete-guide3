import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";

interface StartGameScreenProps {
  onStartGame: (guessNumber: number) => void;
}

const StartGameScreen = ({ onStartGame }: StartGameScreenProps) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () =>
      setButtonWidth(Dimensions.get("window").width / 4);

    Dimensions.addEventListener("change", updateLayout);
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    if (isNaN(+enteredValue) || +enteredValue <= 0 || +enteredValue > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(+enteredValue);
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed && selectedNumber) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You select</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={onStartGame.bind(this, selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://raw.githubusercontent.com/academind/react-native-practical-guide-code/04-deep-dive-real-app/extra-files/images/background.png",
      }}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.imgBack}
    >
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.screen}>
              <Text style={styles.title}>Start a new Game!</Text>
              <Card style={styles.inputContainer}>
                <Text style={defaultStyles.bodyText}>Select a Number</Text>
                <Input
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  value={enteredValue}
                  onChangeText={(text) =>
                    setEnteredValue(
                      text.replace(/[^0-9]/g, "").replace(",", "")
                    )
                  }
                />
                <View style={styles.buttonContainer}>
                  <View style={{ width: buttonWidth }}>
                    <Button
                      title="Reset"
                      onPress={resetInputHandler}
                      color={colors.accent}
                    />
                  </View>
                  <View style={{ width: buttonWidth }}>
                    <Button
                      title="Confirm"
                      onPress={confirmInputHandler}
                      color={colors.primary}
                    />
                  </View>
                </View>
              </Card>
              {confirmedOutput}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBack: { opacity: 0.2 },
  background: { width: "100%", height: "100%", flex: 1 },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 13,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 12,
    alignItems: "center",
  },
});

export default StartGameScreen;
