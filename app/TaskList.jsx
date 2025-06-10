import { useTasksContext } from "@/app/contexts/Tasks";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-web";
import TaskCard from "../components/TaskCard";
import CreateTask from "./CreateTask";

export default function TaskList() {
  const { tasks, updateTaskStatus } = useTasksContext();

  // useEffect(() => {
  //   mockGetTasks().then(({ data }) => {
  //     setTasks(data);
  //   });
  // }, []);

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
        <View>
          {tasks.map((task) => {
            console.log(task);
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })}
        </View>
        <Link href="/CreateTask" accessibilityLabel="create a new task">create new task</Link>
    </View>
  );
}
