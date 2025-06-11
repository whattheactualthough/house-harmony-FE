import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useTasks } from "./contexts/TasksContext";

export default function TasksByRoom() {
  const { tasks } = useTasks();

  if (!tasks) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Group tasks by room
  const tasksByRoom = tasks.reduce((acc, task) => {
    const roomName = task.rooms?.room_name || 'Unknown Room';
    if (!acc[roomName]) {
      acc[roomName] = [];
    }
    acc[roomName].push(task);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Tasks by Room</Text>
        <Text style={styles.subtitle}>
          Tasks organized by household rooms
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {Object.entries(tasksByRoom).map(([roomName, roomTasks]) => (
          <View key={roomName} style={styles.roomSection}>
            <Text style={styles.roomTitle}>{roomName}</Text>
            <Text style={styles.taskCount}>
              {roomTasks.length} task{roomTasks.length !== 1 ? 's' : ''}
            </Text>
            
            {roomTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <Text style={styles.taskName}>{task.task_name}</Text>
                <Text style={styles.taskStatus}>
                  Status: {task.status?.description || 'Unknown'}
                </Text>
                {task.users?.user_name && (
                  <Text style={styles.assignedTo}>
                    Assigned to: {task.users.user_name}
                  </Text>
                )}
                {task.task_desirability_level?.points && (
                  <Text style={styles.points}>
                    Points: {task.task_desirability_level.points}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
        
        {Object.keys(tasksByRoom).length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptyDescription}>
              There are no tasks available at the moment.
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
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  roomSection: {
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#65CCB8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  assignedTo: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2,
  },
  points: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
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

// list of tasks ordered by room. if time could add a modal component to  open with list of rooms to choose from, which takes you to list of tasks by that room.
