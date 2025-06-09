import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from "../styles/colors";

export default function StatusBar({ task, isMyTaskView, onStatusChange, onClaim }) {
  if (task.status.description === '1') { //for some reason on production database it wants '1' but on test database it wants the actual description.
    return (
      <TouchableOpacity style={styles.button} onPress={() => onClaim(task.id)}>
        <Text style={styles.buttonText}>Claim this task</Text>
      </TouchableOpacity>
    );
  }

  if (task.status.description === '2') {
    return  <TouchableOpacity
      style={styles.button}
      onPress={() => onStatusChange(task.id, 'Complete')}
    >
      <Text style={styles.buttonText}>complete this task</Text>
    </TouchableOpacity>

  } else {
return 
}

  
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completeText: {
    marginTop: 8,
    color: 'green',
    fontWeight: 'bold',
  },
});