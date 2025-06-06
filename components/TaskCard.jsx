// data - title, room, description, number of points (desirability level), due date / no of days to complete, status,
// link - take a photo and upload to task
// status can be changed if assigned to user
// as status is updated to complete points for assigned user are updated on profile, homepage, leaderboard

import { Text } from "@react-navigation/elements";

function TaskCard({ task }) {
  return (
    <li>
      <h2>{task.task_name}</h2>
      <Text>{task.status.description}</Text>
      <Text>{task.rooms.room_name}</Text>
      <Text>{task.task_desirability_level.points} points</Text>
      <Text>{task.due_date}</Text>
    </li>
  );
}

export default TaskCard;
