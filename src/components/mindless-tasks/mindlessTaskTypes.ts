
export interface Task {
  name: string;
  instruction: string;
  duration: number;
  component: React.ComponentType<{ onComplete: () => void }>;
}

export interface TaskComponentProps {
  onComplete: () => void;
}
