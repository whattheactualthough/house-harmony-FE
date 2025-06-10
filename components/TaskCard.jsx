// data - title, room, description, number of points (desirability level), due date / no of days to complete, status,
// link - take a photo and upload to task - only visible on complete?
// status can be changed if assigned to user
// as status is updated to complete points for assigned user are updated on profile, homepage, leaderboard
// to do - add axios functionality for status patch in onStatusChange function
// add user feedback on status change haptics, scale, task moves to correct list

import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from "react-native";
import PhotoHandler from "../components/PhotoHandler";
import TaskStatusBar from "../components/TaskStatusBar";
import typography from "../styles/typography";
import getRoomIcons from "../utils";


function TaskCard({ task}) {
const userId = 2;
const [showPhotoHandler, setShowPhotoHandler] = useState(false);
// const [localStatus, setLocalStatus ] = useState(tasks.task_id.status) // not right



const onComplete = ()=> {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // not sure this is working, phone being difficult! 
  console.log(`${task.id} : done`)
  // make a button to be visible oncomplete to upload a photo
}

const onTakePhoto = () => {
  setShowPhotoHandler(true);
}

const onPhotoTaken = (taskId, imageUri) => {
  console.log(`Photo taken for task ${taskId}:`, imageUri);
  // Here you would typically upload the photo to your backend
  // and then mark the task as complete
  onComplete();
  setShowPhotoHandler(false);
}

const onClosePhotoHandler = () => {
  setShowPhotoHandler(false);
}

  return (
    <View style={styles.container}>
      <View style={styles.taskHeader}>
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
          onPress={onPressHandler}
          onTakePhoto={onTakePhoto}
  onStatusChange={() =>
            console.log(`${task.id}status: ${task.status.description}`)
          }
          task={task}
        />
      </View>

    <Modal
      visible={showPhotoHandler}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <PhotoHandler
        taskId={task.id}
        onPhotoTaken={onPhotoTaken}
        onClose={onClosePhotoHandler}
      />
    </Modal>
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
  },
});

export default TaskCard;
