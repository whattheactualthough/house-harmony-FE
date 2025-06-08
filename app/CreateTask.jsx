import { Link } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // printing success message for now => connect to the backend API later
    console.log("Creating task:", {
      task_name: taskName,
      description: description,
      room: room,
      is_urgent: isUrgent
    });
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setRoom("");
    setIsUrgent(false);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Task created successfully! 🎉</Text>
        <Button title="Create Another Task" onPress={resetForm} />
        <Link href="/TaskList" style={styles.link}>
          <Text>View All Tasks</Text>
        </Link>
        <Link href="/HomePage" style={styles.link}>
          <Text>Back to Home</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href="/TaskList" style={styles.backLink}>
        <Text>← Back to Task List</Text>
      </Link>
      
      <Text style={styles.title}>Create New Task</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Task Name *</Text>
        <TextInput
          style={styles.input}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="e.g. Take the bins out"
        />
        
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Optional details about the task"
          multiline
          numberOfLines={3}
        />
        
        <Text style={styles.label}>Room *</Text>
        <TextInput
          style={styles.input}
          value={room}
          onChangeText={setRoom}
          placeholder="e.g. kitchen, bathroom, living room"
        />
        
        <View style={styles.checkboxContainer}>
          <Button 
            title={isUrgent ? "✓ Urgent" : "Mark as Urgent"} 
            onPress={() => setIsUrgent(!isUrgent)}
            color={isUrgent ? "#ff6b6b" : "#666"}
          />
        </View>
        
        <Button 
          title="Create Task" 
          onPress={handleSubmit}
          disabled={!taskName.trim() || !room.trim()}
          color="#4CAF50"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backLink: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  checkboxContainer: {
    marginVertical: 20,
  },
  successText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#4CAF50",
  },
  link: {
    marginTop: 10,
    padding: 10,
    textAlign: "center",
  },
});

export default CreateTask;