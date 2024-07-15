import React, { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import quizData from '../../quizData.json';
import { Option } from '../../types';
import './Quiz.css';
import fetchSuperheroByName from './superheroService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setAnswer, nextQuestion, previousQuestion, setSuperhero, setLoading } from '../../store/slice/quizSlice';

const Quiz: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { answers, superhero, loading, currentQuestionIndex } = useSelector((state: RootState) => state.quiz);

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    dispatch(setAnswer({ questionId, optionId }));
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  const handlePreviousQuestion = () => {
    dispatch(previousQuestion());
  };

  const determineSuperhero = (answers: any): string => {
    if (answers['1'] === 'A' && answers['2'] === 'B' && answers['3'] === 'C') return 'Superman';
    if (answers['1'] === 'B' && answers['2'] === 'A' && answers['3'] === 'B') return 'Batman';
    return 'One-Above-All';
  };

  const handleSubmitQuiz = async () => {
    try {
      dispatch(setLoading(true));
      const result = determineSuperhero(answers);
      const superheroData = await fetchSuperheroByName(result);
      dispatch(setSuperhero(superheroData));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Failed to fetch superhero data:', error);
      dispatch(setLoading(false));
    }
  };

  const OptionButton = styled.button`
    padding: 10px;
    margin: 5px;
    border: 2px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #aaa;
    }

    &.selected {
      border-color: #4CAF50;
      animation: ${keyframes`
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      `} 0.5s ease;
    }
  `;

  const QuestionCard = styled.div`
    margin: 20px 0;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(-20px);
    animation: ${keyframes`
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `} 0.5s ease-out forwards;
  `;

  const renderOptions = (questionId: number, options: Option[]) => {
    return options.map(option => (
      <OptionButton
        key={option.id}
        onClick={() => handleAnswerSelect(questionId, option.id)}
        className={answers[questionId] === option.id ? 'selected' : ''}
      >
        {option.text}
      </OptionButton>
    ));
  };

  const renderCurrentQuestion = () => {
    const question = quizData[currentQuestionIndex];
    if (!question) return null;

    return (
      <QuestionCard key={question.id} className="question">
        <h2>{question.question}</h2>
        <div className="options">
          {renderOptions(question.id, question.options)}
        </div>
      </QuestionCard>
    );
  };

  return (
    <div className="quiz">
      <h1>SuperHero Identity Quiz</h1>
      {loading ? (
        <p>Loading...</p>
      ) : superhero !== undefined ? (
        superhero !== null ? (
          <div className="superhero-profile">
            <h2>Matched Superhero/Villain</h2>
            <h3>Name: {superhero.name}</h3>
            {superhero.image && <img src={superhero.image.url} alt={superhero.name} />}
          </div>
        ) : (
          <div>Not Match</div>
        )
      ) : (
        <Fragment>
          {renderCurrentQuestion()}
          <div className="navigation">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Previous</button>
            )}
            {currentQuestionIndex < quizData.length - 1 ? (
              <button onClick={handleNextQuestion}>Next</button>
            ) : (
              <button onClick={handleSubmitQuiz}>Submit Quiz</button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Quiz;
