export interface RecordSet {
  todoId: number;
  setsNumber: number;
  repsTarget: number;
  weight: number;
  isCompleted: boolean;
}

export interface RecordWorkout {
  workoutId: number;
  exerciseName: string;
  burnedCalories: number | null;
  sets: RecordSet[];
}
