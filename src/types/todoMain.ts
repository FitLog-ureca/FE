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
