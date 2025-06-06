import { mockGetPointsById } from "@/api";
import { useEffect, useState } from "react";
import { Text } from "react-native-web";

function UserCard({ user }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    mockGetPointsById(user.id).then((data) => {
      setPoints(data.totalPoints);
    });
  }, [points]);

  return (
    <>
      <Text>{user.group_name}</Text>
      <Text>{user.user_name}</Text>
      <Text>{points} points</Text>
    </>
  );
}

export default UserCard;
