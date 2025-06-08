// data - title, room, description, number of points (desirability level), due date / no of days to complete, status,
// link - take a photo and upload to task
// status can be changed if assigned to user
// as status is updated to complete points for assigned user are updated on profile, homepage, leaderboard

import { StyleSheet, Text, View } from "react-native";
import getRoomIcons from "../utils";

function TaskCard({ task }) {
  console.log(task);
  
  return (
    <View>
      <View style={styles.container}>
        <View style ={styles.taskHeader} > {getRoomIcons(task.rooms.room_name)}
        <Text style={styles.roomNameText}>{task.rooms.room_name}</Text>
        </View>
        <Text style = {{marginTop: 16}}>{task.task_name}</Text>
        <Text>{task.status.description}</Text>
        <Text>{task.users ? `Assigned to: ${task.users.user_name}` : 'Claim now'}</Text>
        <Text>{task.task_desirability_level.points} points</Text>
        {task.task_specific_date ? task.task_specific_date : task.due_date}
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
    alignSelf: "center"
  },
  taskHeader: {
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    marginBottom: 8
  },
roomNameText: {
    marginLeft: 8,
    fontWeight: "bold"
},
taskHeader: {
  backgroundColor: '#F2F2F2', 
  paddingVertical: 7,
  paddingHorizontal: 12,
  borderTopLeftRadius: 8, 
  borderTopRightRadius: 8,  
  width: '100%',  
  flexDirection: 'row',
  alignItems: 'center',
},
});

export default TaskCard;
// {/* <MaterialIcons name="kitchen" size={24} color="black" /> */}
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// <MaterialIcons name="other-houses" size={24} color="black" />

// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; - sofa
// <MaterialCommunityIcons name="sofa-outline" size={24} color="black" />

// import MaterialIcons from '@expo/vector-icons/MaterialIcons'; dining table
// <MaterialIcons name="table-restaurant" size={24} color="black" />

// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// <MaterialCommunityIcons name="toilet" size={24} color="black" />

// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// <FontAwesome6 name="bath" size={24} color="black" />

// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// <FontAwesome6 name="stairs" size={24} color="black" />

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// <MaterialIcons name="grass" size={24} color="black" />

// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; - coat cuboard icon
//  <MaterialCommunityIcons name="door-closed" size={24} color="black" />

// // import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; - tulip
// <MaterialIcons name="other-houses" size={24} color="black" />

// import Ionicons from '@expo/vector-icons/Ionicons'; - bin
// <Ionicons name="trash-outline" size={24} color="black" />
