import React from "react";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import { useTasksContext } from "../contexts/TasksContext";

export default function TaskList() {
  const { tasks } = useTasksContext();

  if (!tasks.length) {
    return <Text>Loading tasks…</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Link href="/HomePage">← Home</Link>
      <Text style={{ fontSize: 24, marginVertical: 12 }}>All Tasks</Text>
      <ScrollView>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ScrollView>
    </View>
  );
}
