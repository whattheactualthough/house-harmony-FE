import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { mockGetTasksById } from "../api";
import TaskCard from "../components/TaskCard";
import TaskNav from "../components/TaskNav";

function TasksByUser() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    mockGetTasksById(2).then(({ data }) => {
      setTasks(data);
    });
  }, []);

  if (!tasks) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <TaskNav />
      
      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>My Tasks</Text>
          <Text style={styles.taskCount}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned to you
          </Text>
        </View>

        {tasks.length > 0 ? (
          <View style={styles.taskList}>
            {tasks.map((task) => {
              const key = task.id;
              return <TaskCard key={key} task={task} />;
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No tasks assigned</Text>
            <Text style={styles.emptyDescription}>
              You don't have any tasks assigned to you yet. Check out the "All Tasks" tab to claim some tasks!
            </Text>
          </View>
        )}
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
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
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
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default TasksByUser;