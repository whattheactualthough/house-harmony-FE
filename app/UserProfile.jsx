import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { useUserContext } from "../contexts/UserContext";
import { fetchUsers, fetchUserPoints, fetchTasksByUser } from "../api";

export default function UserProfile() {
  const { user } = useUserContext();
  const [points, setPoints] = useState(0);
  const [userTasks, setUserTasks] = useState([]);
  const [leaderboardRank, setLeaderboardRank] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) return;
    (async () => {
      try {
        const pts = await fetchUserPoints(user.id);
        setPoints(pts.totalPoints ?? pts["Total Points"] ?? 0);

        const tasksRes = await fetchTasksByUser(user.id);
        setUserTasks(tasksRes.data ?? tasksRes);

        const usersRes = await fetchUsers();
        const allUsers = usersRes.data ?? usersRes;
        setTotalUsers(allUsers.length);

        const pointsList = await Promise.all(
          allUsers.map(async (u) => {
            const p = await fetchUserPoints(u.id);
            return {
              id: u.id,
              user_name: u.user_name,
              points: p.totalPoints ?? p["Total Points"] ?? 0,
            };
          }),
        );
        pointsList.sort((a, b) => b.points - a.points);
        setLeaderboardRank(pointsList.findIndex((u) => u.id === user.id) + 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading…</Text>
      </View>
    );
  if (!user)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading profile</Text>
        <Link href="/HomePage">
          <Text>Home</Text>
        </Link>
      </View>
    );

  const counts = userTasks.reduce(
    (acc, t) => {
      if (t.status.description === "claimed") acc.claimed++;
      if (t.status.description === "completed") acc.completed++;
      return acc;
    },
    { claimed: 0, completed: 0 },
  );

  const badgeCount = [
    counts.completed >= 5,
    points >= 100,
    leaderboardRank <= 3,
  ].filter(Boolean).length;

  const suffix = (r) => {
    if (r % 10 === 1 && r % 100 !== 11) return "st";
    if (r % 10 === 2 && r % 100 !== 12) return "nd";
    if (r % 10 === 3 && r % 100 !== 13) return "rd";
    return "th";
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <Link href="/HomePage">
          <Text>← Home</Text>
        </Link>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          {user.image_url && (
            <Image
              source={{ uri: user.image_url }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {user.user_name}
          </Text>
          <Text style={{ color: "#666" }}>{user.group_name}</Text>
          {user.is_admin && (
            <Text
              style={{
                marginTop: 5,
                backgroundColor: "#4CAF50",
                color: "#fff",
                padding: 4,
                borderRadius: 12,
              }}
            >
              Admin
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 30 }}>
          <View
            style={{
              backgroundColor: "#f0f0f0",
              padding: 20,
              borderRadius: 10,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Points & Ranking
            </Text>
            <Text>Total Points: {points}</Text>
            <Text>
              Rank: {leaderboardRank}
              {suffix(leaderboardRank)} of {totalUsers}
            </Text>
            <Text>Badges: {badgeCount}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#f0f0f0",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Task Summary
            </Text>
            <Text>Total: {userTasks.length}</Text>
            <Text>Claimed: {counts.claimed}</Text>
            <Text>Completed: {counts.completed}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Recent Tasks
          </Text>
          {userTasks.slice(0, 5).map((t) => (
            <View
              key={t.id}
              style={{
                backgroundColor: "#f0f0f0",
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{t.task_name}</Text>
              <Text>Room: {t.rooms.room_name}</Text>
              <Text>Points: {t.task_desirability_level.points}</Text>
              <Text>Status: {t.status.description}</Text>
            </View>
          ))}
          {!userTasks.length && <Text>No tasks assigned</Text>}
        </View>
        <View>
          <Link href="/TaskList">
            <Text
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              View All Tasks
            </Text>
          </Link>
          <Link href="/LeaderBoard">
            <Text
              style={{
                backgroundColor: "#2196F3",
                color: "#fff",
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Leaderboard
            </Text>
          </Link>
          <Link href="/TasksByUser">
            <Text
              style={{
                backgroundColor: "#FF9800",
                color: "#fff",
                padding: 15,
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              My Tasks
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
