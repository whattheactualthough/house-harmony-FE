import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import SlideButton from 'rn-slide-button';
import { useTasks } from "../app/contexts/TasksContext";
import colors from "../styles/colors";

export default function StatusBar({ task, onTakePhoto, onPress }) {
    const { claimTask, updateTaskStatusContext } = useTasks();

const handleClaimTask = ()=> {
    const userId = 2;
    claimTask(task.id, userId)
    console.log("task claimed in handle claim in status bar")
}


  const handleStatusChange = () => {
    updateTaskStatusContext(task.id, '2');
    console.log("status handled in status bar")
  };

  if (task.status.description === '1') {
    return (
      // <SlideButton title="Slide To Claim this task" onReachedToEnd={onPress}/>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Claim this task</Text>
      </TouchableOpacity>
    );
  }

  if (task.status.description === '2') {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateTaskStatusContext(task.id, '4')}
        >
          <Text style={styles.buttonText}>Complete this task</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.photoButton}
          onPress={onTakePhoto}
        >
          <Text style={styles.buttonText}>Take photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (task.status.description === '4') {
    return (
      <Text style={styles.completeText}>✓ Completed</Text>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  photoButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  completeText: {
    marginTop: 8,
    color: colors.secondary,
    fontWeight: 'bold',
    paddingRight: 8,
    paddingBottom: 8
  },
});