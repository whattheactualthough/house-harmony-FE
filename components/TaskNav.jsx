import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TopNav() {
  const router = useRouter();        
  const pathname = usePathname();    
  const navItems = [
    { label: 'All Tasks', path: '/TaskList' },
    { label: 'My Tasks', path: '/TasksByUser' },
    { label: 'By Room', path: '/TasksByRoom' },
  ];

  return (
    <View style={styles.navContainer}>
      {navItems.map((item) => {
        let isActive = false;
        if (pathname === item.path) {
          isActive = true;
        }

        const goToPage = () => {
          router.push(item.path);
        };

        return (
          <TouchableOpacity
            key={item.path}
            onPress={goToPage}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text style={[styles.tabText, isActive && styles.activeText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  activeText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});