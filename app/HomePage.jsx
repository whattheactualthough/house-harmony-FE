import { useTasksContext } from "@/app/contexts/Tasks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { mockGetUserById } from "../api";
import TaskCard from "../components/TaskCard";
import TaskNav from "../components/TaskNav";
import UserCard from "../components/UserCard";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const { tasks, updateTaskStatus } = useTasksContext();

  useEffect(() => {
    mockGetUserById(2).then(({ data }) => {
      setUser(data);
    });
  }, []);

  const tasksByUser = tasks.filter(
    (task) =>
      task.users &&
      user &&
      task.users.user_name.toLowerCase() === user.user_name.toLowerCase()
  );

  if (!user || !tasks) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.page}>
      <View style={{ flex: 1 }}>
        <TaskNav />

        <View>
          <UserCard key={2} user={user} />
        </View>
        <View>
          {tasksByUser.map((task) => {
            const key = task.id;
            return <TaskCard key={key} task={task} />;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
});

// links to full task list, tasks by room, leaderboard, user profile.
// data - user data & profile pic
// data - current points, place on leaderboard, latest badges
// data - task list of claimed tasks ordered by urgency / status - can change task status here
// clickable - complete task, upload photo
{
  /* <View>
      <Link href="/TaskList" accessibilityLabel = "go to full task list">all tasks</Link>
      <Link href="/TasksByUser" accessibilityLabel = "go to my tasks">my tasks</Link>
      <Link href="/TasksByRoom" accessibilityLabel = "go to tasks by room">by room</Link>
    </View> */
}
