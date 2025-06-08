// data - title, room, description, number of points (desirability level), due date / no of days to complete, status,
// link - take a photo and upload to task
// status can be changed if assigned to user
// as status is updated to complete points for assigned user are updated on profile, homepage, leaderboard
// to do - add axios functionality for status patch in onStatusChange function
// add user feedback on status change

import { StyleSheet, Text, View } from "react-native";
import TaskStatusBar from "../components/TaskStatusBar";
import typography from "../styles/typography";
import getRoomIcons from "../utils";

function TaskCard({ task}) {
const userId = 2;


  return (
    // left: title with icon, description, status
    // right: assigned to, points given
    <View style={styles.container}>
        <View style = {styles.taskHeader}>
        {getRoomIcons(task.rooms.room_name)}
        <Text style={[styles.taskHeaderText, typography.heading]}>
          {task.rooms.room_name}
        </Text>
        </View>
      <View>
        <View style={styles.topCard}>
          <View style={styles.topLeftCard}>
            <Text style={{ marginTop: 16 }}>{task.task_name}</Text>
            <Text>{task.description}</Text>
          </View>
          <View style={styles.topRightCard}>
            <Text>{task.task_desirability_level.points} points</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomCard}>
        <Text>
          {task.users ? `Assigned to: ${task.users.user_name}` : "Claim now"}
        </Text>

        <Text>
          {task.task_specific_date ? task.task_specific_date : task.due_date}
        </Text>

        <TaskStatusBar
  status={task.status.description}
  claimedByUser={userId}
  onClaim={() => console.log(`Claim task ${task.id}`)}
  onComplete={() => console.log(`${task.id} : done`)}
  onStatusChange={() => console.log(`${task.id}status: ${task.status.description}`)}
  task={task}
  />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#65CCB8",
    borderRadius: 8,
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    overflow: "hidden",
    flexDirection: "column",
  },
  taskHeaderText: {
    marginLeft: 6,
  },
  taskHeader: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  topCard: {
    flex: 1,
    paddingRight: 12,
  },
  topRightCard: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  topLeftCard: {
    flex: 1,
  },
  bottomCard: {
    flexDirection: "row",
    marginTop: "auto", 
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  }
});

export default TaskCard;