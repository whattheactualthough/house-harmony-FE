import typography from "@/styles/typography";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { UserContext } from '../app/contexts/UserContext';

function UserCard() {
  // const [points, setPoints] = useState(0);

  // useEffect(() => {
  //   mockGetPointsById(user.id).then((data) => {
  //     setPoints(data.totalPoints);
  //   });
  // }, [points]);
      const { user} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.userHeader}>
      <Text style={[styles.group, typography.heading]}>
  {user.group_name}
</Text>
</View>
      <View style={styles.row}>
        <View style={styles.leftCard}>
          <Image source={{ uri: user.image_url }} style={styles.avatar}></Image>
          <Text style={styles.name}>{user.user_name}</Text>
        </View>
        <View style={styles.rightCard}>
          
          <Text style={styles.points}>{user.points} points</Text> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10, 
    overflow: "hidden",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.1,
    marginVertical: 10

  },
  userHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12
  },
  leftCard: {
    flexDirection: "row",
    alignItems: "center"
  },
  rightCard:{
alignItems: "flex-end"
,  },
  group: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  name: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  points: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: "#eee",
  },
});

export default UserCard;

// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// export default function UserCard({
//   profileImage,
//   name,
//   group,
//   points,
//   badges,
//   rank,
// }) {
//   return (
//     <View style={styles.card}>
//       <Image source={{ uri: profileImage }} style={styles.avatar} />

//       <View style={styles.infoContainer}>
//         <Text style={styles.name}>{name}</Text>
//         <Text style={styles.group}>{group}</Text>

//         <View style={styles.row}>
//           <Text style={styles.label}>Points: </Text>
//           <Text style={styles.value}>{points}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Badges: </Text>
//           <Text style={styles.value}>{badges}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Rank: </Text>
//           <Text style={styles.value}>#{rank}</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     margin: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 16,
//     backgroundColor: '#eee',
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: '#333',
//   },
//   group: {
//     color: '#666',
//     fontSize: 14,
//     marginBottom: 6,
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 2,
//   },
//   label: {
//     fontWeight: '500',
//     color: '#888',
//   },
//   value: {
//     fontWeight: '600',
//     color: '#333',
//   },
// });
