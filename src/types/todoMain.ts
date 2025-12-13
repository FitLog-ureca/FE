interface SetItemType {
  id: number;
  setsNumber: number;
  repsTarget: number;
  weight: number;
}

interface GoalType {
  id: number;
  exercise: string | null;
  sets: SetItemType[];
}

interface SetListProps {
  goal: GoalType;
  completed: boolean;
  onCreateSet: (goalId: number) => void;
  onRemoveGoal: (goalId: number) => void;
  onRemoveSet: (goalId: number, setId: number) => void;
  onUpdateSet: (
    goalId: number,
    setId: number,
    newValues: Partial<Pick<SetItemType, "repsTarget" | "weight">>
  ) => void;
}

interface SetType {
  id: number;
  setsNumber: number;
  repsTarget: number;
  weight: number;
}

interface SetItemProps {
  set: SetType;
  goalId: number;
  completed: boolean;
  onRemoveSet: (goalId: number, setId: number) => void;
  onUpdateSet: (
    goalId: number,
    setId: number,
    newValues: {
      repsTarget?: number;
      weight?: number;
    }
  ) => void;
}