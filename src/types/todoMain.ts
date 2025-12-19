export interface GoalType {
  id: number;
  exercise: string | null;
  sets: SetItemType[];
}

export interface SetItemType {
  id: number;
  setsNumber: number;
  repsTarget: number | "";
  weight: number | "";
}

export type SetUpdatePayload = Partial<Pick<SetItemType, "repsTarget" | "weight">>;

export interface SetListProps {
  goal: GoalType;
  completed: boolean;
  onCreateSet: (goalId: number) => void;
  onRemoveGoal: (goalId: number) => void;
  onRemoveSet: (goalId: number, setId: number) => void;
  onUpdateSet: (goalId: number, setId: number, newValues: SetUpdatePayload) => void;
}

export interface SetItemProps {
  set: SetItemType;
  goalId: number;
  completed: boolean;
  onRemoveSet: (goalId: number, setId: number) => void;
  onUpdateSet: (goalId: number, setId: number, newValues: SetUpdatePayload) => void;
}

export type Exercise = {
  id: number;
  name: string;
};

/* GoalHeader.tsx */
export interface GoalHeaderProps {
  completed: boolean;
  selectedDate: string; // YYYY-MM-DD
}

/* GoalList.tsx */
export interface GoalListProps {
  goals: GoalType[];
  selectedDate: string;
}

/* ExerciseDropdownButton.tsx */
export type ExerciseListItem = {
  exerciseId: number;
  name: string;
};

export interface ExercisesDropdownButtonProps {
  completed: boolean;
  onToggleCompleted: () => void;
  onSelectExercise: (exerciseId: number) => void;
}

/* Greeting.tsx */
export type GreetingProps = {
  username: string;
};