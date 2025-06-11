import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BeatLoader } from "react-spinners";
import TaskCard from "../components/TaskCard";
import colors from "../styles/colors";
import { useTasks } from "./contexts/TasksContext";
import { useUser } from "./contexts/UserContext";

export default function TaskList() {
  const { tasks, userTasks, isLoading } = useTasks();
  const { userId } = useUser();
  console.log(tasks)

  if (!tasks) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

   if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <BeatLoader
        color={colors.primary}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>All Tasks</Text>
          <Text style={styles.taskCount}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} available
          </Text>
        </View>
        
        <View style={styles.taskList}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskCount: {
    fontSize: 14,
    color: '#666',
  },
  taskList: {
    paddingVertical: 10,
  },
   loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
});