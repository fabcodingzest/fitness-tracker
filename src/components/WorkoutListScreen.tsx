import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TabType } from "../../App";
import { useWorkout } from "../context/WorkProvider";

interface WorkoutListProps {
  type: TabType;
}

const WorkoutListScreen = ({ type }: WorkoutListProps) => {
  const { workouts } = useWorkout();
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const filteredWorkouts = workouts.filter((workout) => {
    if (type === "daily") {
      const isToday = new Date(workout.date).toDateString() === new Date(now).toDateString();
      return isToday;
    }

    if (type === "weekly") {
      return now - workout.date <= 7 * ONE_DAY;
    }

    return false;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No workouts</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.type}>{item.type}</Text>
            <Text>{item.intensity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default WorkoutListScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  type: {
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
