import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { mockGetTasksById, mockGetUserById } from "../api";
import TaskCard from "../components/TaskCard";

export default function UserPage() {
 const [user, setUser] = useState(null);
 const [tasks, setTasks] = useState(null);


 useEffect(() => {
   mockGetUserById(2).then(({ data }) => {
     setUser(data);
   });
 }, []);


 useEffect(() => {
   mockGetTasksById(2).then(({ data }) => {
     setTasks(data);
   });
 }, []);


 if (!user || !tasks) {
   return <Text>Loading...</Text>;
 }
 console.log(user);
 return (
   <View>
    <View>
      <Link href="/TaskList" accessibilityLabel = "go to full task list">all tasks</Link>
      <Link href="/TasksByUser" accessibilitylabel = "go to my tasks">my tasks</Link>
      <Link href="/TasksByRoom" accessibilitylabel = "go to tasks by room">by room</Link>
    </View>
    <ol className="song-list">
      {tasks.map((task) => {
        const key = task.id
        return <TaskCard key={key} task={task} />
    })}
    </ol>
     <View>
      <Link href="/LeaderBoard" accessibilityLabel = "go to leaderboard">leaderboard</Link>
      <Link href="/UserProfile" accessibilityLabel = "go to full your profile page">profile page</Link>
     </View>
   </View>
  
 );
}

// links to full task list, tasks by room, leaderboard, user profile.  
// data - user data & profile pic
// data - current points, place on leaderboard, latest badges
// data - task list of claimed tasks ordered by urgency / status - can change task status here

