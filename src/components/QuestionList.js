import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, deleteQuestion, updateQuestionAnswer}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            deleteQuestion={deleteQuestion}
            updateQuestionAnswer={updateQuestionAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;