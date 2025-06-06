// data - title, room, description, number of points (desirability level), due date / no of days to complete, status,
// link - take a photo and upload to task
// status can be changed if assigned to user
// as status is updated to complete points for assigned user are updated on profile, homepage, leaderboard

import { Text, View } from "react-native";

function TaskCard({ task }) {
    console.log(task)
  return (
    <View>
      <Text>{task.task_name}</Text>
      <Text>{task.status.description}</Text>
      <Text>{task.rooms.room_name}</Text>
      <Text>{task.task_desirability_level.points} points</Text>
      <Text>{task.due_date}</Text>
    </View>
  );
}

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
// <MaterialCommunityIcons name="flower-tulip" size={24} color="black" />

// import Ionicons from '@expo/vector-icons/Ionicons'; - bin
// <Ionicons name="trash-outline" size={24} color="black" />

