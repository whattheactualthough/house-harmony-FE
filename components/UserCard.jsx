import { mockGetPointsById } from "@/api";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function UserCard({ user }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    mockGetPointsById(user.id).then((data) => {
      setPoints(data.totalPoints);
    });
  }, [points]);

  return (
    <View style={styles.container}>
      <Text style={styles.group}>{user.group_name}</Text>
      <Text style={styles.name}>{user.user_name}</Text>
      <Text style={styles.points}>{points} points</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    BackgroundColor: "pink",
  },
  group: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  name: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  points: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});

export default UserCard;
