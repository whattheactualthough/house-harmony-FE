import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function TaskNav() {
  const router = useRouter();        
  const pathname = usePathname();    
  
  const navItems = [
    { 
      label: 'Home', 
      path: '/HomePage',
      description: 'Dashboard & Overview'
    },
    { 
      label: 'All Tasks', 
      path: '/TaskList',
      description: 'View all available tasks'
    },
    // { 
    //   label: 'My Tasks', 
    //   path: '/TasksByUser',
    //   description: 'Tasks assigned to you'
    // },
    { 
      label: 'By Room', 
      path: '/TasksByRoom',
      description: 'Tasks organized by room'
    },
    { 
      label: 'Create Task', 
      path: '/CreateTask',
      description: 'Add a new task'
    }
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  const navigateToPage = (path) => {
    router.push(path);
  };

  return (
    <View style={styles.navContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <TouchableOpacity
              key={item.path}
              onPress={() => navigateToPage(item.path)}
              style={[styles.navItem, active && styles.activeNavItem]}
              accessibilityLabel={`Navigate to ${item.label}: ${item.description}`}
            >
              <Text style={[styles.navText, active && styles.activeNavText]}>
                {item.label}
              </Text>
              {active && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
  
      <View style={styles.contextBar}>
        <Text style={styles.contextText}>
          {getContextMessage(pathname)}
        </Text>
      </View>
    </View>
  );
}

function getContextMessage(pathname) {
  switch (pathname) {
    case '/HomePage':
      return '🏠 Welcome to your dashboard';
    case '/TaskList':
      return '📋 All available tasks for your group';
    case '/TasksByUser':
      return '👤 Your claimed and completed tasks';
    case '/TasksByRoom':
      return '🏠 Tasks organized by room';
    case '/CreateTask':
      return '➕ Add a new task for your housemates';
    case '/LeaderBoard':
      return '🏆 See who\'s contributing the most';
    case '/UserProfile':
      return '👤 Your profile and achievements';
    default:
      return '🏠 House Harmony - Task Management';
  }
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  navItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    position: 'relative',
    minWidth: 80,
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#65CCB8',
    shadowColor: '#65CCB8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  activeNavText: {
    color: '#fff',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  contextBar: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  contextText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TaskNav;