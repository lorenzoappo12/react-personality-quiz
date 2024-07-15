import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Superhero } from '../../components/quiz/Superhero.type';

interface QuizState {
  answers: { [key: number]: string };
  superhero: Superhero | null | undefined;
  loading: boolean;
  currentQuestionIndex: number;
}

const initialState: QuizState = {
  answers: {},
  superhero: undefined,
  loading: false,
  currentQuestionIndex: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: number; optionId: string }>) => {
      state.answers[action.payload.questionId] = action.payload.optionId;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    previousQuestion: (state) => {
      state.currentQuestionIndex -= 1;
    },
    setSuperhero: (state, action: PayloadAction<Superhero | null>) => {
      state.superhero = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAnswer, nextQuestion, previousQuestion, setSuperhero, setLoading } = quizSlice.actions;
export default quizSlice.reducer;
