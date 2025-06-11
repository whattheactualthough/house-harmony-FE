import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from "../styles/colors";


export default function StatusBar({ task, isMyTaskView, onStatusChange, onClaim, onTakePhoto, onPress }) {
//   if (task.status.description === 'up for grabs') {
  if (task.status.description === 'up for grabs') { //for some reason on production database it wants '1' but on test database it wants the actual description.

    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Claim this task</Text>
      </TouchableOpacity>
    );
  }

  if (task.status.description === 'claimed') {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onStatusChange(task.id, 'Complete')}
        >
          <Text style={styles.buttonText}>Complete task</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.photoButton}
          onPress={onTakePhoto}
        >
          <Text style={styles.buttonText}>Take photo</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (task.status.description === 'complete') {
    return (
      <Text style={styles.completeText}>✓ Completed</Text>
    );
  }

  if (task.status.description === '2') {
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
    color: 'green',
    fontWeight: 'bold',
  },
});