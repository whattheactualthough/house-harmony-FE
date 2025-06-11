import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-web";
import { mockGetTasksById } from "../api";
import TaskCard from "../components/TaskCard";

export default function TasksByUser() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    mockGetTasksById(2).then(({ data }) => {
      setTasks(data);
    });
  }, []);

  if (!tasks) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Link href="/HomePage" accessibilityLabel="go back to homepage">
        home page
      </Link>
      <Text>My Tasks</Text>
      <View>
        {tasks.map((task) => {
          const key = task.id;
          return <TaskCard key={key} task={task} />;
        })}
      </View>
    </View>
  );
}