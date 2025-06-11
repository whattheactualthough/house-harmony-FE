import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import UserCard from "../components/UserCard";
import { useTasks } from "./contexts/TasksContext";
import { useUser } from "./contexts/UserContext";

export default function UserPage() {

  const { userTasks, isLoading } = useTasks();
  console.log(userTasks)
const {user} = useUser();
  // const tasksByUser = tasks?.filter(
  //   (task) =>
  //     task.users &&
  //     user &&
  //     task.users.user_name.toLowerCase() === user.user_name.toLowerCase()
  // );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView style={styles.content}>
      <View>
        <UserCard key={2} user={user} />
      </View>
      <View>
        {userTasks?.map((task) => {
          const key = task.id;
          return <TaskCard key={key} task={task} />;
        })}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
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
