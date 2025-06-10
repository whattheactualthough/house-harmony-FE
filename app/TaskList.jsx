import { Link, View } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native-web";
import { fetchTasksForGroup } from "../api";
import TaskCard from "../components/TaskCard";
import CreateTask from "./CreateTask";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // mockGetTasks().then(({ data }) => {
    //   setTasks(data);
    // });
    fetchTasksForGroup().then(({data})=>{
      setTasks(data)
    })
  }, []);

  if (!tasks) {
    return <Text>Loading...</Text>;
  }

  function addTask(){
   return (CreateTask)
  }

  return (
    <ScrollView>
      <Link href="/HomePage" accessibilityLabel="go back to homepage">
        home page
      </Link>
        <View>
          {tasks.map((task) => {
            console.log(task);
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })}
        </View>
        <Link href="/CreateTask" accessibilityLabel="create a new task">create new task</Link>
    </ScrollView>
  );
}
