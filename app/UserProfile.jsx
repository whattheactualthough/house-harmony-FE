import { Link } from "expo-router";
import { View } from "react-native";


export default function UserProfile() {
  return (
    <View>
      <Link href="/HomePage" accessibilityLabel="go back to homepage">
        home page
      </Link>
    </View>
  );
}

//profile image, name, housname, place on leaderboard for current week and overall, badges
