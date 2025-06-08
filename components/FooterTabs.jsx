import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FooterTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Leaderboard', path: '/LeaderBoard' },
    { name: 'Profile', path: '/UserProfile' },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => {
        const focused = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.path)}
            style={[styles.tab, focused && styles.activeTab]}
          >
            <Text style={[styles.tabText, focused && styles.activeText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "colors.accent",
  },
  tabText: {
    color: '#666',
  },
  activeText: {
    color: "colors.accent",
    fontWeight: "bold",
  },
});