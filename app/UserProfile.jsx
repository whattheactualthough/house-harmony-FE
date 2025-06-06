import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useUser } from "./contexts/User";

function UserProfile({}) {
 const user = useUser()

  console.log(user)
  return (
    <View>
      <Link href="/HomePage" accessibilityLabel="go back to homepage">
        home page
      </Link>
      <Text>{user.user_name}</Text>
      <Text>{user.group_name}</Text>
      <Text>housemate since {user.created_at} </Text>
    </View>
  );
}

export default UserProfile

//profile image, name, housname, place on leaderboard for current week and overall, badges
