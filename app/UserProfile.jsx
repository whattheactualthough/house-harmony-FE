import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { mockGetPointsById, mockGetTasksById, mockGetUserById, mockGetUsers } from "../api";
import { useUser } from "./contexts/UserContext";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [userTasks, setUserTasks] = useState([]);
  const [leaderboardRank, setLeaderboardRank] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentUserId = 1;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await mockGetUserById(currentUserId);
        setUser(userResponse.data);

        // Fetch user points
        const pointsResponse = await mockGetPointsById(currentUserId);
        setPoints(pointsResponse.totalPoints || 0);

        // Fetch user's tasks
        const tasksResponse = await mockGetTasksById(currentUserId);
        setUserTasks(tasksResponse.data || []);

        // Calculate leaderboard position
        const allUsersResponse = await mockGetUsers();
        const allUsers = allUsersResponse.data;
        setTotalUsers(allUsers.length);

        // Get points for all users and calculate rank
        const userPointsPromises = allUsers.map(async (u) => {
          const userPoints = await mockGetPointsById(u.id);
          return {
            id: u.id,
            name: u.user_name,
            points: userPoints.totalPoints || 0
          };
        });

        const allUserPoints = await Promise.all(userPointsPromises);
        const sortedUsers = allUserPoints.sort((a, b) => b.points - a.points);
        const userRank = sortedUsers.findIndex(u => u.id === currentUserId) + 1;
        setLeaderboardRank(userRank);

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTaskStatusCounts = () => {
    const counts = {
      claimed: 0,
      completed: 0,
      total: userTasks.length
    };

    userTasks.forEach(task => {
      if (task.status.description === 'claimed') {
        counts.claimed++;
      } else if (task.status.description === 'complete') {
        counts.completed++;
      }
    });

    return counts;
  };

  const getLeaderboardPosition = () => {
    if (!leaderboardRank || !totalUsers) return 'Loading...';
    
    const suffix = (rank) => {
      if (rank % 10 === 1 && rank % 100 !== 11) return 'st';
      if (rank % 10 === 2 && rank % 100 !== 12) return 'nd';
      if (rank % 10 === 3 && rank % 100 !== 13) return 'rd';
      return 'th';
    };

    return `${leaderboardRank}${suffix(leaderboardRank)} out of ${totalUsers}`;
  };

  const getBadgeCount = () => {
    // Mock badge calculation based on completed tasks and points
    const taskCounts = getTaskStatusCounts();
    let badges = 0;

    // Badge for completing 5+ tasks
    if (taskCounts.completed >= 5) badges++;
    // Badge for earning 100+ points
    if (points >= 100) badges++;
    // Badge for being in top 3
    if (leaderboardRank && leaderboardRank <= 3) badges++;

    return badges;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading profile</Text>
        <Link href="/HomePage">
          <Text>Go back to home</Text>
        </Link>
      </View>
    );
  }

  const taskCounts = getTaskStatusCounts();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        
        {/* Navigation */}
        <Link href="/HomePage" style={{ marginBottom: 20 }}>
          <Text>← Back to Home</Text>
        </Link>

        {/* Profile Header */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image 
            source={{ uri: user.image_url || 'https://via.placeholder.com/100' }} 
            style={{ 
              width: 100, 
              height: 100, 
              borderRadius: 50, 
              backgroundColor: '#eee',
              marginBottom: 15 
            }} 
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>
            {user.user_name}
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 5 }}>
            {user.group_name}
          </Text>
          {user.is_admin && (
            <Text style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              paddingHorizontal: 10, 
              paddingVertical: 3, 
              borderRadius: 12, 
              fontSize: 12 
            }}>
              Admin
            </Text>
          )}
        </View>

        {/* Stats Cards */}
        <View style={{ marginBottom: 30 }}>
          
          {/* Points Card */}
          <View style={{ 
            backgroundColor: '#f8f9fa', 
            padding: 20, 
            borderRadius: 10, 
            marginBottom: 15 
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Points & Ranking
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Total Points: <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>{points}</Text>
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Leaderboard Position: <Text style={{ fontWeight: 'bold' }}>{getLeaderboardPosition()}</Text>
            </Text>
            <Text style={{ fontSize: 16 }}>
              Badges Earned: <Text style={{ fontWeight: 'bold' }}>{getBadgeCount()}</Text>
            </Text>
          </View>

          {/* Tasks Summary Card */}
          <View style={{ 
            backgroundColor: '#f8f9fa', 
            padding: 20, 
            borderRadius: 10, 
            marginBottom: 15 
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Task Summary
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Total Tasks: <Text style={{ fontWeight: 'bold' }}>{taskCounts.total}</Text>
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Currently Claimed: <Text style={{ fontWeight: 'bold', color: '#FF9800' }}>{taskCounts.claimed}</Text>
            </Text>
            <Text style={{ fontSize: 16 }}>
              Completed: <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>{taskCounts.completed}</Text>
            </Text>
          </View>

          {/* Membership Info Card */}
          <View style={{ 
            backgroundColor: '#f8f9fa', 
            padding: 20, 
            borderRadius: 10, 
            marginBottom: 15 
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Membership Info
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Member since: <Text style={{ fontWeight: 'bold' }}>{formatDate(user.created_at)}</Text>
            </Text>
            <Text style={{ fontSize: 16 }}>
              Account Type: <Text style={{ fontWeight: 'bold' }}>{user.is_admin ? 'Admin' : 'Member'}</Text>
            </Text>
          </View>
        </View>

        {/* Recent Tasks */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
            Your Recent Tasks
          </Text>
          {userTasks.length > 0 ? (
            userTasks.slice(0, 5).map((task) => (
              <View key={task.id} style={{ 
                backgroundColor: '#f8f9fa', 
                padding: 15, 
                borderRadius: 8, 
                marginBottom: 10 
              }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                  {task.task_name}
                </Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
                  Room: {task.rooms.room_name}
                </Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
                  Points: {task.task_desirability_level.points}
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: 'bold', 
                  color: task.status.description === 'claimed' ? '#FF9800' : '#4CAF50' 
                }}>
                  Status: {task.status.description}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', padding: 20 }}>
              No tasks assigned yet
            </Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
            Quick Actions
          </Text>
          <Link href="/TaskList" style={{ 
            backgroundColor: '#4CAF50', 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 10 
          }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              View All Tasks
            </Text>
          </Link>
          <Link href="/LeaderBoard" style={{ 
            backgroundColor: '#2196F3', 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 10 
          }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              View Leaderboard
            </Text>
          </Link>
          <Link href="/TasksByUser" style={{ 
            backgroundColor: '#FF9800', 
            padding: 15, 
            borderRadius: 8 
          }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              My Tasks Only
            </Text>
          </Link>
        </View>

      </View>
    </ScrollView>
  );
}

export default UserProfile;