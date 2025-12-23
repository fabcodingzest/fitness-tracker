import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import WorkoutListScreen from "./src/components/WorkoutListScreen";
import { useState } from "react";
import { WorkoutProvider } from "./src/context/WorkProvider";
import AddWorkoutModel from "./src/components/AddWorkoutModel";

export type TabType = "daily" | "weekly";

const config = [
  {
    type: "daily",
    component: WorkoutListScreen,
  },
  {
    type: "weekly",
    component: WorkoutListScreen,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");
  const [openWorkoutModel, setOpenWorkoutModel] = useState<boolean>(false);

  const handleAddWorkout = () => {
    setOpenWorkoutModel(true);
  };

  return (
    <WorkoutProvider>
      <View style={styles.container}>
        <Text>Fitness tracker app</Text>
        <StatusBar style="auto" />
        <View style={styles.tabsContainer}>
          {config.map((tab) => (
            <Text
              key={tab.type}
              onPress={() => setActiveTab(tab.type as TabType)}
              style={[styles.tab, activeTab === tab.type && styles.activeTab]}
            >
              {tab.type.toUpperCase()}
            </Text>
          ))}
        </View>
        <View style={styles.content}>
          {activeTab === "daily" && <WorkoutListScreen type="daily" />}
          {activeTab === "weekly" && <WorkoutListScreen type="weekly" />}
        </View>
        <Pressable style={styles.btn} onPress={handleAddWorkout}>
          <Text style={styles.btnTxt}>+</Text>
        </Pressable>
      </View>
      <AddWorkoutModel
        visible={openWorkoutModel}
        mode="add"
        onClose={() => setOpenWorkoutModel(false)}
      />
    </WorkoutProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    color: "#666",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  content: {
    flex: 1,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "lightblue",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: { fontSize: 24 },
});
