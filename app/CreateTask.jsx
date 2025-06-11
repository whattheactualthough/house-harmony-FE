import { Link } from "expo-router";
import { useState } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Alert
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../styles/colors";
import typography from "../styles/typography";

function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [desirability, setDesirability] = useState("medium");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("7"); // days
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const desirabilityOptions = [
    { value: "low", label: "Low", points: 25, color: "#57BA98" },
    { value: "medium", label: "Medium", points: 50, color: "#65CCB8" },
    { value: "high", label: "High", points: 100, color: "#3B945E" }
  ];

  const frequencyOptions = [
    { value: "1", label: "Daily" },
    { value: "7", label: "Weekly" },
    { value: "14", label: "Bi-weekly" },
    { value: "30", label: "Monthly" }
  ];

  const roomOptions = [
    "Kitchen", "Living Room", "Bathroom", "Dining Room", 
    "Stairs and Landing", "Front Garden", "Back Garden", 
    "Basement", "General"
  ];

  const getDesirabilityPoints = (level) => {
    const option = desirabilityOptions.find(opt => opt.value === level);
    return option ? option.points : 25;
  };

  const handleSubmit = () => {
    if (!taskName.trim() || !room.trim()) {
      Alert.alert("Missing Fields", "Please fill in the task name and room.");
      return;
    }

    const taskData = {
      task_name: taskName,
      description: description,
      room: room,
      is_urgent: isUrgent,
      desirability: desirability,
      points: getDesirabilityPoints(desirability),
      is_recurring: isRecurring,
      recurring_frequency: isRecurring ? parseInt(recurringFrequency) : null,
      due_date: hasDueDate ? dueDate : null
    };

    // here you should call the API 
    console.log("Creating task:", taskData);
    console.log("Task created!");
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setRoom("");
    setIsUrgent(false);
    setDesirability("medium");
    setIsRecurring(false);
    setRecurringFrequency("7");
    setHasDueDate(false);
    setDueDate("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color={colors.primary} />
          <Text style={[styles.successTitle, typography.subheading]}>
            Task Created Successfully! 🎉
          </Text>
          <Text style={[styles.successSubtitle, typography.body]}>
            Your task has been added and is now available for your housemates to claim.
          </Text>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton} onPress={resetForm}>
              <Text style={styles.primaryButtonText}>Create Another Task</Text>
            </TouchableOpacity>
            
            <Link href="/TaskList" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>View All Tasks</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/HomePage" asChild>
              <TouchableOpacity style={styles.tertiaryButton}>
                <Text style={styles.tertiaryButtonText}>Back to Home</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, typography.subheading]}>Create New Task</Text>
        <Text style={[styles.subtitle, typography.body]}>
          Add a new task for your household
        </Text>
      </View>
      
      <View style={styles.form}>
        {/* Task Name */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, typography.heading]}>Task Name *</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="e.g. Take the bins out"
            placeholderTextColor="#999"
          />
        </View>
        
        {/* Description */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, typography.heading]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Optional details about the task"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
        </View>
        
        {/* Room Selection */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, typography.heading]}>Room *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
            {roomOptions.map((roomOption) => (
              <TouchableOpacity
                key={roomOption}
                style={[
                  styles.optionChip,
                  room === roomOption && styles.selectedChip
                ]}
                onPress={() => setRoom(roomOption)}
              >
                <Text style={[
                  styles.optionText,
                  room === roomOption && styles.selectedOptionText
                ]}>
                  {roomOption}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Task Desirability */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, typography.heading]}>Task Desirability</Text>
          <Text style={[styles.helperText, typography.caption]}>
            How much do you want this task done? Higher desirability = more points
          </Text>
          <View style={styles.desirabilityContainer}>
            {desirabilityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.desirabilityOption,
                  { borderColor: option.color },
                  desirability === option.value && { backgroundColor: option.color }
                ]}
                onPress={() => setDesirability(option.value)}
              >
                <Text style={[
                  styles.desirabilityLabel,
                  desirability === option.value && styles.selectedDesirabilityLabel
                ]}>
                  {option.label}
                </Text>
                <Text style={[
                  styles.pointsText,
                  desirability === option.value && styles.selectedPointsText
                ]}>
                  {option.points} pts
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Urgent Toggle */}
        <View style={styles.fieldContainer}>
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setIsUrgent(!isUrgent)}
          >
            <View style={styles.toggleInfo}>
              <Text style={[styles.label, typography.heading]}>Mark as Urgent</Text>
              <Text style={[styles.helperText, typography.caption]}>
                Urgent tasks appear at the top of the list
              </Text>
            </View>
            <View style={[styles.toggle, isUrgent && styles.toggleActive]}>
              <Ionicons 
                name={isUrgent ? "checkmark" : "close"} 
                size={20} 
                color={isUrgent ? "#fff" : "#999"} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recurring Toggle */}
        <View style={styles.fieldContainer}>
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setIsRecurring(!isRecurring)}
          >
            <View style={styles.toggleInfo}>
              <Text style={[styles.label, typography.heading]}>Recurring Task</Text>
              <Text style={[styles.helperText, typography.caption]}>
                Task will automatically recreate itself
              </Text>
            </View>
            <View style={[styles.toggle, isRecurring && styles.toggleActive]}>
              <Ionicons 
                name={isRecurring ? "checkmark" : "close"} 
                size={20} 
                color={isRecurring ? "#fff" : "#999"} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recurring Frequency */}
        {isRecurring && (
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, typography.heading]}>Frequency</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
              {frequencyOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionChip,
                    recurringFrequency === option.value && styles.selectedChip
                  ]}
                  onPress={() => setRecurringFrequency(option.value)}
                >
                  <Text style={[
                    styles.optionText,
                    recurringFrequency === option.value && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Due Date Toggle */}
        <View style={styles.fieldContainer}>
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setHasDueDate(!hasDueDate)}
          >
            <View style={styles.toggleInfo}>
              <Text style={[styles.label, typography.heading]}>Set Due Date</Text>
              <Text style={[styles.helperText, typography.caption]}>
                Add a specific deadline for this task
              </Text>
            </View>
            <View style={[styles.toggle, hasDueDate && styles.toggleActive]}>
              <Ionicons 
                name={hasDueDate ? "checkmark" : "close"} 
                size={20} 
                color={hasDueDate ? "#fff" : "#999"} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Due Date Input */}
        {hasDueDate && (
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, typography.heading]}>Due Date</Text>
            <TextInput
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#999"
            />
            <Text style={[styles.helperText, typography.caption]}>
              Format: YYYY-MM-DD (e.g., 2025-06-15)
            </Text>
          </View>
        )}
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!taskName.trim() || !room.trim()) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!taskName.trim() || !room.trim()}
        >
          <Text style={styles.submitButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    marginBottom: 5,
    color: colors.textDark,
  },
  subtitle: {
    color: "#666",
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  label: {
    marginBottom: 8,
    color: colors.textDark,
  },
  helperText: {
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: colors.textDark,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  optionScroll: {
    marginTop: 5,
  },
  optionChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: colors.primary,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#fff",
  },
  desirabilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  desirabilityOption: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  desirabilityLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  selectedDesirabilityLabel: {
    color: "#fff",
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedPointsText: {
    color: "#fff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  toggleInfo: {
    flex: 1,
  },
  toggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  successTitle: {
    textAlign: "center",
    marginVertical: 20,
    color: colors.textDark,
  },
  successSubtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  buttonGroup: {
    width: "100%",
    gap: 15,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tertiaryButton: {
    padding: 15,
    alignItems: "center",
  },
  tertiaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CreateTask;