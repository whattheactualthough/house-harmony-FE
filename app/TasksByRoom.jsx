import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-web";
import { mockGetTasksByRoom } from "../api";
import TaskCard from "../components/TaskCard";

export default function TasksByRoom() {
const [tasks, setTasks] = useState(null);

  useEffect(() => {
    mockGetTasksByRoom().then(({ data }) => {
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
      <ol>
          {tasks.map((task) => {
            console.log(task);
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })}
        </ol>
    </View>
  );
}

// to list of tasks ordered by room. if time could add a modal component to  open with list of rooms to choose from which takes you to list of tasks by that room.