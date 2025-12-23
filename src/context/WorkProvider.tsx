import React, { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

export type WorkoutType = "running" | "yoga" | "HIIT" | "zumba" | "cardio";
export type IntensityType = "low" | "med" | "high";

export interface WorkoutData {
  id: string;
  type: WorkoutType;
  intensity: IntensityType;
  completed: boolean;
  date: number;
}

interface WorkoutContextType {
  workouts: WorkoutData[];
  setWorkouts: Dispatch<SetStateAction<WorkoutData[]>>;
  addWorkout: (intensity: IntensityType, type: WorkoutType) => void;
  markWorkoutComplete: (id: string) => void;
  deleteWorkout: (id: string) => void;
  editWorkout: (id: string, updates: Partial<WorkoutData>) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>([
    { id: "fsef", type: "yoga", completed: false, intensity: "high", date: Date.now() },
  ]);

  const addWorkout = (intensity: IntensityType, type: WorkoutType) => {
    const workout = {
      id: Date.now().toString(),
      type,
      intensity,
      completed: false,
      date: Date.now(),
    };
    setWorkouts((prev) => [...prev, workout]);
  };

  const markWorkoutComplete = (id: string) => {
    setWorkouts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  const editWorkout = (id: string, updates: Partial<WorkoutData>) => {
    setWorkouts((prev) =>
      prev.map((workout) => (workout.id === id ? { ...workout, ...updates } : workout))
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        setWorkouts,
        addWorkout,
        markWorkoutComplete,
        deleteWorkout,
        editWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("Context is unavailable");
  }
  return context;
};
