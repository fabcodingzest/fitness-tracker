import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { useWorkout } from "../context/WorkProvider";
import { WorkoutType, IntensityType, WorkoutData } from "../context/WorkProvider";
import Dropdown from "./Dropdown";

interface WorkoutModalProps {
  visible: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  workout?: WorkoutData;
}

const workoutTypeOptions = [
  { label: "Running", value: "running" },
  { label: "Yoga", value: "yoga" },
  { label: "HIIT", value: "HIIT" },
];

const intensityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "med" },
  { label: "High", value: "high" },
];

const WorkoutModal = ({ visible, onClose, mode, workout }: WorkoutModalProps) => {
  const { addWorkout, editWorkout } = useWorkout();

  const [type, setType] = useState<WorkoutType>("running");
  const [intensity, setIntensity] = useState<IntensityType>("low");

  // Pre-fill fields when editing
  useEffect(() => {
    if (mode === "edit" && workout) {
      setType(workout.type);
      setIntensity(workout.intensity);
    }
  }, [mode, workout]);

  const handleSave = () => {
    if (mode === "add") {
      addWorkout(intensity, type);
    }

    if (mode === "edit" && workout) {
      editWorkout(workout.id, {
        type,
        intensity,
      });
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" presentationStyle="pageSheet">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{mode === "add" ? "Add Workout" : "Edit Workout"}</Text>

          <Text style={styles.label}>Workout Type</Text>
          <Dropdown
            data={workoutTypeOptions}
            active={type}
            onSelect={(value) => setType(value as WorkoutType)}
          />

          <Text style={styles.label}>Intensity</Text>
          <Dropdown
            data={intensityOptions}
            active={intensity}
            onSelect={(value) => setIntensity(value as IntensityType)}
          />

          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  label: {
    marginTop: 8,
    fontWeight: "500",
  },
  option: {
    paddingVertical: 6,
    color: "#555",
  },
  selected: {
    fontWeight: "700",
    color: "#000",
  },
  saveBtn: {
    marginTop: 16,
  },
  saveText: {
    color: "green",
    fontWeight: "600",
  },
  cancelText: {
    marginTop: 8,
    color: "red",
  },
});
