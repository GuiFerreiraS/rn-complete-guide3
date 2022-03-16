import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={{ ...styles.headerTitle, ...defaultStyles.title }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "black",
  },
});

export default Header;
