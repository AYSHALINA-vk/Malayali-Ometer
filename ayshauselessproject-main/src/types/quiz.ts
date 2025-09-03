export interface QuizAnswer {
  questionId: number;
  answer: string | number;
}

export interface GameScore {
  gameId: string;
  score: number;
  maxScore: number;
}

export interface QuizData {
  answers: Record<number, string | number>;
  gameScores: Record<string, number>;
  totalScore: number;
  completed: boolean;
}

export interface Question {
  id: number;
  type: 'multiple-choice' | 'slider' | 'image-select';
  question: string;
  options?: string[];
  images?: Array<{ src: string; label: string; value: string }>;
  min?: number;
  max?: number;
  sliderLabels?: { min: string; max: string };
}

export interface ResultData {
  score: number;
  title: string;
  description: string;
  fact: string;
  badge: string;
}