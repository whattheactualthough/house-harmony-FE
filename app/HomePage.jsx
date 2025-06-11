// File: app/HomePage.jsx

import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { useTasksContext } from "../contexts/TasksContext";
import { useUserContext } from "../contexts/UserContext";
import { fetchUsers, fetchUserPoints, fetchTasksByUser } from "../api";

export default function UserPage() {
  const { tasks } = useTasksContext();
  const { user } = useUserContext();
  const [points, setPoints] = useState(0);
  const [userTasks, setUserTasks] = useState([]);
  const [leaderboardRank, setLeaderboardRank] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
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
        console.error("Error loading profile data:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading profile</Text>
        <Link href="/HomePage">
          <Text>Go back</Text>
        </Link>
      </View>
    );
  }

  const taskCounts = userTasks.reduce(
    (acc, t) => {
      if (t.status.description === "claimed") acc.claimed++;
      if (t.status.description === "completed") acc.completed++;
      return acc;
    },
    { claimed: 0, completed: 0 },
  );

  const getLeaderboardPosition = () => {
    const suffix = (r) =>
      r % 10 === 1 && r % 100 !== 11
        ? "st"
        : r % 10 === 2 && r % 100 !== 12
          ? "nd"
          : r % 10 === 3 && r % 100 !== 13
            ? "rd"
            : "th";
    return `${leaderboardRank}${suffix(leaderboardRank)} of ${totalUsers}`;
  };

  const getBadgeCount = () => {
    let badges = 0;
    if (taskCounts.completed >= 5) badges++;
    if (points >= 100) badges++;
    if (leaderboardRank <= 3) badges++;
    return badges;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <Link href="/HomePage">
          <Text>← Back to Home</Text>
        </Link>

        {/* Profile Header */}
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          {user.image_url ? (
            <Image
              source={{ uri: user.image_url }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 15,
              }}
            />
          ) : null}
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
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                fontSize: 12,
              }}
            >
              Admin
            </Text>
          )}
        </View>

        {/* Stats */}
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
            <Text style={{ marginTop: 5 }}>Total Points: {points}</Text>
            <Text style={{ marginTop: 5 }}>
              Rank: {getLeaderboardPosition()}
            </Text>
            <Text style={{ marginTop: 5 }}>Badges: {getBadgeCount()}</Text>
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
            <Text style={{ marginTop: 5 }}>Total: {userTasks.length}</Text>
            <Text style={{ marginTop: 5, color: "#FF9800" }}>
              Claimed: {taskCounts.claimed}
            </Text>
            <Text style={{ marginTop: 5, color: "#4CAF50" }}>
              Completed: {taskCounts.completed}
            </Text>
          </View>
        </View>

        {/* Recent Tasks */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
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
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {t.task_name}
              </Text>
              <Text style={{ color: "#666" }}>Room: {t.rooms.room_name}</Text>
              <Text style={{ color: "#666" }}>
                Points: {t.task_desirability_level.points}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color:
                    t.status.description === "claimed" ? "#FF9800" : "#4CAF50",
                }}
              >
                {t.status.description}
              </Text>
            </View>
          ))}
          {!userTasks.length && (
            <Text style={{ textAlign: "center", color: "#666" }}>
              No tasks assigned
            </Text>
          )}
        </View>

        {/* Quick Links */}
        <View>
          <Link href="/TaskList">
            <Text
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                textAlign: "center",
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
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
                textAlign: "center",
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
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
                textAlign: "center",
                padding: 15,
                borderRadius: 8,
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
