import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import { useTasks } from "./contexts/TasksContext";


export default function TaskList() {
  
  const { tasks } = useTasks();
console.log(tasks, "hiiiii")

  if (!tasks) {
    return <Text>Loading...</Text>;
  }

  // function addTask(){
  //  return (CreateTask)
  // }

  return (
    <ScrollView>
      <Link href="/HomePage" accessibilityLabel="go back to homepage">
        home page
      </Link>
        <View>
          {tasks?.data?.map((task) => {
            console.log(task);
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })}
        </View>
        <Link href="/CreateTask" accessibilityLabel="create a new task">create new task</Link>
    </ScrollView>
  );
}
