import { useTasksContext } from "@/app/contexts/TasksContext";
import { View } from "react-native";
import { Text } from "react-native-web";
import TaskCard from "../components/TaskCard";
import TaskNav from "../components/TaskNav";

export default function TasksByRoom() {
  const { tasks, updateTaskStatus } = useTasksContext();

  const tasksByRoom = tasks.filter(
    (task) =>
      task.room &&
      task.rooms.room_name.toLowerCase() === user.user_name.toLowerCase()
  );

  if (!tasks) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <View style={{ flex: 1 }}>
        <TaskNav />
        <View>
          {tasks.map((task) => {
            console.log(task);
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })}
        </View>
      </View>
    </View>
  );
}

// list of tasks ordered by room. if time could add a modal component to  open with list of rooms to choose from, which takes you to list of tasks by that room.
