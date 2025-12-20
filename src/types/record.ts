export interface RecordSet {
  todoId: number;
  setsNumber: number;
  repsTarget: number;
  weight: number | null;
  isCompleted: boolean;
}

export interface RecordWorkout {
  workoutId: number;
  exerciseName: string;
  burnedCalories: number;
  sets: RecordSet[];
}
