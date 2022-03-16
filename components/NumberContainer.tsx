import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

interface NumberContainerProps {
  children: ReactNode;
}

const NumberContainer = ({ children }: NumberContainerProps) => {
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NumberContainer;
