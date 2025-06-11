import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import { useTasks } from "./contexts/TasksContext";
import { useUser } from "./contexts/UserContext";

export default function TaskList() {
  const { tasks, userTasks } = useTasks();
  const { userId } = useUser();

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
        {tasks?.map((task) => {
          const key = task.id;
          return (
            <TaskCard
              key={key}
              task={task}
              onClaim={() => claimTask(task.id, userId)}
            />
          );
        })}
      </View>
      <Link href="/CreateTask" accessibilityLabel="create a new task">
        create new task
      </Link>
    </ScrollView>
  );
}
