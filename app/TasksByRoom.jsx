import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import TaskCard from "../components/TaskCard";
import { useTasksContext } from "../contexts/TasksContext";

export default function TasksByRoom() {
  const { tasks } = useTasksContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const roomName = "kitchen"; // or read from router params
    setFiltered(
      tasks.filter(
        (t) => t.rooms?.room_name?.toLowerCase() === roomName.toLowerCase(),
      ),
    );
  }, [tasks]);

  if (!tasks.length) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Link href="/HomePage">← Home</Link>
      {filtered.length === 0 ? (
        <Text>No tasks in this room.</Text>
      ) : (
        filtered.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </View>
  );
}
