import { Link } from "expo-router";
import { View } from "react-native";
export default function LeaderBoard() {
  return (
    <View>
      <Link href="/HomePage" accessibilityLabel="go back to homepage">
        home page
      </Link>
    </View>
  );
}

// use library for data visualisation 