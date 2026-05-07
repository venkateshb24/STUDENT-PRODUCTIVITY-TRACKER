import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import { quizData } from "../data/QuizData";
import toast from "react-hot-toast";
import "./Quiz.css";

function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectFromUrl = searchParams.get("subject");
  const initialSubject = subjectFromUrl && quizData[subjectFromUrl]
    ? subjectFromUrl
    : null;

  // Which screen to show: "select", "quiz", or "result"
  const [screen, setScreen] = useState(initialSubject ? "quiz" : "select");
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const subject = selectedSubject ? quizData[selectedSubject] : null;

  // User picks a subject
  const handleSelectSubject = (key) => {
    setSelectedSubject(key);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers({});
    setScore(0);
    setScreen("quiz");
    setSearchParams({ subject: key });
  };

  // User picks an answer option
  const handleSelectOption = (index) => {
    setSelectedOption(index);
  };

  // Go to next question or finish quiz
  const saveQuizAttempt = async (finalScore) => {
    try {
      await api.post("/quiz/attempt", {
        subject: selectedSubject,
        score: finalScore,
        total: subject.questions.length,
      });
      toast.success("Quiz score saved");
    } catch {
      toast.error("Quiz finished, but score was not saved");
    }
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    // Save this answer
    const newAnswers = { ...answers, [currentQuestion]: selectedOption };
    setAnswers(newAnswers);

    const isLast = currentQuestion === subject.questions.length - 1;

    if (isLast) {
      // Calculate final score
      let finalScore = 0;
      subject.questions.forEach((q, i) => {
        if (newAnswers[i] === q.correct) {
          finalScore = finalScore + 1;
        }
      });
      setScore(finalScore);
      setScreen("result");
      await saveQuizAttempt(finalScore);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  // Go back to subject selection
  const handleBack = () => {
    setSelectedSubject(null);
    setScreen("select");
    setSearchParams({});
  };

  // Retry the same quiz
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers({});
    setScore(0);
    setScreen("quiz");
  };

  return (
    <Sidebar>

      {/* ── SUBJECT SELECTION SCREEN ── */}
      {screen === "select" && (
        <div>
          <div className="page-header">
            <h1 className="page-title">Core Subject Quiz</h1>
            <p className="page-sub">Pick a subject to test your knowledge</p>
          </div>
          <div className="subject-grid">
            {Object.entries(quizData).map(([key, subject]) => (
              <div
                key={key}
                className="subject-card"
                onClick={() => handleSelectSubject(key)}
              >
                <span className="sc-icon">{subject.icon}</span>
                <div className="sc-info">
                  <p className="sc-name">{subject.name}</p>
                  <p className="sc-count">{subject.questions.length} questions</p>
                </div>
                <span className="sc-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── QUIZ SCREEN ── */}
      {screen === "quiz" && subject && (
        <div>
          <div className="quiz-top">
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <span className="quiz-subject">{subject.icon} {subject.name}</span>
            <span className="quiz-counter">
              {currentQuestion + 1} / {subject.questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${(currentQuestion / subject.questions.length) * 100}%` }}
            />
          </div>

          {/* Question card */}
          <div className="question-card">
            <p className="question-num">Question {currentQuestion + 1}</p>
            <p className="question-text">
              {subject.questions[currentQuestion].question}
            </p>

            <div className="options-list">
              {subject.questions[currentQuestion].options.map((option, i) => (
                <div
                  key={i}
                  className={`option ${selectedOption === i ? "option--selected" : ""}`}
                  onClick={() => handleSelectOption(i)}
                >
                  <span className="option-letter">{["A", "B", "C", "D"][i]}</span>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>

            <button
              className={`next-btn ${selectedOption === null ? "next-btn--disabled" : ""}`}
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion === subject.questions.length - 1 ? "Submit Quiz →" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT SCREEN ── */}
      {screen === "result" && subject && (
        <div>
          <div className="page-header">
            <h1 className="page-title">Quiz Results</h1>
            <p className="page-sub">{subject.icon} {subject.name}</p>
          </div>

          <div className="result-card">
            <p className="result-score">{score} / {subject.questions.length}</p>
            <p className="result-pct">
              {Math.round((score / subject.questions.length) * 100)}%
            </p>
            <p className="result-msg">
              {score === subject.questions.length ? "Perfect! 🎉" : "Keep practicing! 📖"}
            </p>
            <div className="result-btns">
              <button className="retry-btn" onClick={handleRetry}>Try Again</button>
              <button className="back-to-subjects-btn" onClick={handleBack}>All Subjects</button>
            </div>
          </div>

          {/* Review answers */}
          <div className="review-section">
            <p className="review-title">Review Answers</p>
            {subject.questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correct;
              return (
                <div
                  key={i}
                  className={`review-item ${isCorrect ? "review-item--correct" : "review-item--wrong"}`}
                >
                  <div className="review-q">
                    <span className="review-status">{isCorrect ? "✓" : "✗"}</span>
                    <span className="review-question">{q.question}</span>
                  </div>
                  {!isCorrect && (
                    <div className="review-answer">
                      <span className="review-yours">You chose: {q.options[userAnswer]}</span>
                      <span className="review-correct">Correct: {q.options[q.correct]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </Sidebar>
  );
}

export default Quiz;
