import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchUserPoints, fetchUsers } from '../api';
import { useUser } from './contexts/UserContext';

export default function LeaderBoard() {
  const { user } = useUser();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const usersResponse = await fetchUsers();
        const users = usersResponse.data;
        const mockUsers = [...users.filter((user) => user.user_name !== 'Kiran'), user];

        const leaderboardPromises = mockUsers.map(async (user) => {
          const pointsResponse = await fetchUserPoints(user.id);
          console.log(pointsResponse.data['Total Points']);
          return {
            ...user,
            totalPoints:
              user.user_name === 'Kiran' ? user.points : pointsResponse.data['Total Points'] || 0,
          };
        });

        const leaderboardResults = await Promise.all(leaderboardPromises);

        const sortedLeaderboard = leaderboardResults
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
          }));

        setLeaderboardData(sortedLeaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return styles.firstPlace;
      case 2:
        return styles.secondPlace;
      case 3:
        return styles.thirdPlace;
      default:
        return styles.otherPlace;
    }
  };

  const getRankContainerStyle = (rank) => {
    switch (rank) {
      case 1:
        return { ...styles.rankContainer, backgroundColor: '#fef3c7' };
      case 2:
        return { ...styles.rankContainer, backgroundColor: '#f1f5f9' };
      case 3:
        return { ...styles.rankContainer, backgroundColor: '#fed7aa' };
      default:
        return styles.rankContainer;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>{/* <BeatLoader color={colors.primary} /> */}</View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <Text style={styles.subtitle}>House Harmony Champions</Text>
      </View>

      <ScrollView style={styles.leaderboardContainer}>
        {leaderboardData.map((user) => (
          <View key={user.id} style={[styles.leaderboardItem, getRankStyle(user.rank)]}>
            <View style={getRankContainerStyle(user.rank)}>
              <Text style={styles.rankEmoji}>{getRankEmoji(user.rank)}</Text>
              <Text style={styles.rankNumber}>#{user.rank}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.user_name}</Text>
              {user.is_admin && <Text style={styles.adminBadge}>Admin</Text>}
            </View>

            <View style={styles.pointsContainer}>
              <Text style={styles.points}>{user.totalPoints}</Text>
              <Text style={styles.pointsLabel}>points</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {leaderboardData.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>House Stats</Text>
          <Text style={styles.statsText}>Total members: {leaderboardData.length}</Text>
          <Text style={styles.statsText}>
            Total points earned: {leaderboardData.reduce((sum, user) => sum + user.totalPoints, 0)}
          </Text>
          <Text style={styles.statsText}>
            Average points:{' '}
            {Math.round(
              leaderboardData.reduce((sum, user) => sum + user.totalPoints, 0) /
                leaderboardData.length
            )}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f4f8',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginTop: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    fontWeight: '500',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 6,
    borderRadius: 20,
    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  firstPlace: {
    backgroundColor: '#fefce8',
    borderColor: '#facc15',
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.15,
  },
  secondPlace: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderWidth: 2,
  },
  thirdPlace: {
    backgroundColor: '#fef7ed',
    borderColor: '#fb923c',
    borderWidth: 2,
  },
  otherPlace: {
    backgroundColor: '#ffffff',
    borderColor: '#f1f5f9',
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#f8fafc',
  },
  rankEmoji: {
    fontSize: 28,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  userInfo: {
    flex: 1,
    marginRight: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  adminBadge: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 80,
  },
  points: {
    fontSize: 22,
    fontWeight: '800',
    color: '#16a34a',
    lineHeight: 24,
  },
  pointsLabel: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderTopWidth: 4,
    borderTopColor: '#10b981',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    letterSpacing: -0.25,
  },
  statsText: {
    fontSize: 15,
    color: '#475569',
    marginVertical: 4,
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#64748b',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

// import React from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function Example() {
//   return (
//     <MaterialCommunityIcons name="podium" color="#000" size={24} /> podium

// import React from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function Example() {
//   return (
//     <MaterialCommunityIcons name="podium-gold" color="#000" size={24} />
//   )
// } podium-silver, podium-bronze

// import React from 'react';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// export default function Example() {
//   return (
//     <SimpleLineIcons name="badge" color="#000" size={24} />
//   )
// }

//   )

// }
