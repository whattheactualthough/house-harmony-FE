import { View } from "react-native";
import { Text } from "react-native-web";
import TaskNav from "../components/TaskNav";
import { useTasks } from "./contexts/TasksContext";

export default function TasksByRoom() {
const { tasks } = useTasks();
console.log(tasks, "rooooommmmm")
  const tasksByRoom = tasks.data.filter(
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
        {/* <View>
          {tasksByRoom?.map((task) => {
            console.log(task);
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })} */}
        {/* </View> */}
      </View>
    </View>
  );
}

// list of tasks ordered by room. if time could add a modal component to  open with list of rooms to choose from, which takes you to list of tasks by that room.
