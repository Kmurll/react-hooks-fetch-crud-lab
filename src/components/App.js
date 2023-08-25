import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the server on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch questions from the server and update the state
  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  };

  // Create a new question and update the state
  const createQuestion = (questionData) => {
    fetch("http://localhost:4000/questions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    })
      .then(response => response.json())
      .then(newQuestion => {
        console.log("New Question:", newQuestion);
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      })
      .catch(error => console.error('Error creating question:', error));
  }

  // Delete a question and update the state
  const deleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'DELETE',
    })
      .then(fetchQuestions) // Refresh the list of questions
      .catch(error => console.error('Error deleting question:', error));
  }

  // Update a question's correct answer and update the state
  const updateQuestionAnswer = (questionId, correctIndex) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(fetchQuestions) // Refresh the list of questions
      .catch(error => console.error('Error updating question answer:', error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === 'Form' ? (
        <QuestionForm createQuestion={createQuestion} />
      ) : (
        <QuestionList
          questions={questions} // Passes the updated questions array
          deleteQuestion={deleteQuestion}
          updateQuestionAnswer={updateQuestionAnswer}
        />
      )}
    </main>
  );
}

export default App
