import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-web";
import { mockGetTasks } from "../api";
import TaskCard from "../components/TaskCard";
import CreateTask from "./CreateTask";



export default function TaskList() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    mockGetTasks().then(({ data }) => {
      setTasks(data);
    });
  }, []);

  if (!tasks) {
    return <Text>Loading...</Text>;
  }

  function addTask(){
   return (CreateTask)
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
        <Link href="/CreateTask" accessibilityLabel="create a new task">create new task</Link>
    </View>
  );
}
