import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function FooterTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { 
      name: 'Home', 
      path: '/HomePage',
      icon: 'home',
      iconFocused: 'home'
    },
    { 
      name: 'Leaderboard', 
      path: '/LeaderBoard',
      icon: 'trophy-outline',
      iconFocused: 'trophy'
    },
    { 
      name: 'Profile', 
      path: '/UserProfile',
      icon: 'person-outline',
      iconFocused: 'person'
    },
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
            accessibilityLabel={`Navigate to ${tab.name}`}
          >
            <View style={styles.tabContent}>
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Ionicons 
                  name={focused ? tab.iconFocused : tab.icon} 
                  size={24} 
                  color={focused ? '#fff' : '#65CCB8'} 
                />
              </View>
              <Text style={[styles.tabText, focused && styles.activeText]}>
                {tab.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  activeTab: {
    // No additional styling needed for active tab container
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#65CCB8',
    shadowColor: '#65CCB8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeText: {
    color: '#65CCB8',
    fontWeight: '600',
  },
});

export default FooterTabs;