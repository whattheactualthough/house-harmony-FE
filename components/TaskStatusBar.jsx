import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from "../styles/colors";

export default function StatusBar({ task, isMyTaskView, onStatusChange, onClaim, onPress }) {
  if (task.status.description === 'up for grabs') {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Claim this task</Text>
      </TouchableOpacity>
    );
  }

  if (task.status.description === 'claimed') {
    return  <TouchableOpacity
      style={styles.button}
      onPress={onPress}
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