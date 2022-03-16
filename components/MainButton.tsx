import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import colors from "../constants/colors";

interface MainButtonProps {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

const MainButton = ({ children, onPress }: MainButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default MainButton;
