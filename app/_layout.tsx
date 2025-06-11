import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";
import FooterTabs from "../components/FooterTabs";
import { TasksProvider } from "./contexts/TasksContext";
import { UserProvider } from "./contexts/UserContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const queryClient = new QueryClient();

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TasksProvider>
          <View style={styles.container}>
            <View style={styles.content}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="HomePage" options={{ title: "Home" }} />
                <Stack.Screen name="TaskList" options={{ title: "Tasks" }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </View>
            <FooterTabs />
            <StatusBar style="auto" />
          </View>
        </TasksProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});
